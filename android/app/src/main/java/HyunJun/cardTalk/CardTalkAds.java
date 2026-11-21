package HyunJun.cardTalk;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.libraries.ads.mobile.sdk.MobileAds;
import com.google.android.libraries.ads.mobile.sdk.banner.AdSize;
import com.google.android.libraries.ads.mobile.sdk.banner.AdView;
import com.google.android.libraries.ads.mobile.sdk.banner.BannerAd;
import com.google.android.libraries.ads.mobile.sdk.banner.BannerAdRequest;
import com.google.android.libraries.ads.mobile.sdk.common.AdLoadCallback;
import com.google.android.libraries.ads.mobile.sdk.common.LoadAdError;
import com.google.android.libraries.ads.mobile.sdk.initialization.InitializationConfig;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;
import java.util.concurrent.CompletableFuture;

@CapacitorPlugin(name = "CardTalkAndroid")
public class CardTalkAds extends Plugin {
    private final Handler main = new Handler(Looper.getMainLooper());
    private ConsentInformation consent;
    private FrameLayout slot;
    private View page;
    private AdView ad;
    private boolean completed, resumed, updated, consentChecked, showingForm, initializing, destroyed;
    private int attemptedWidth;
    private final View.OnLayoutChangeListener resize = (v, l, t, r, b, ol, ot, or, ob) -> {
        if (r - l != or - ol) reconcile();
    };

    @Override
    public void load() {
        main.post(() -> {
            if (destroyed || getContext().getString(R.string.admob_app_id).isEmpty()) return;
            slot = getActivity().findViewById(R.id.finish_banner);
            page = (View) slot.getParent();
            page.addOnLayoutChangeListener(resize);
            consent = UserMessagingPlatform.getConsentInformation(getContext());
            consent.requestConsentInfoUpdate(getActivity(), new ConsentRequestParameters.Builder().build(),
                () -> finishUpdate(true), error -> {
                    Log.i("CardTalkAds", "Consent update: " + error.getErrorCode());
                    finishUpdate(false);
                });
        });
    }

    private void finishUpdate(boolean current) {
        if (destroyed) return;
        updated = true;
        // If the network is unavailable, UMP may still allow an existing decision.
        consentChecked = !current;
        notifyListeners("privacyChanged", privacyState());
        reconcile();
    }

    private JSObject privacyState() {
        JSObject state = new JSObject();
        state.put("required", consent != null && consent.getPrivacyOptionsRequirementStatus()
            == ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED);
        return state;
    }

    @PluginMethod
    public void getPrivacyState(PluginCall call) {
        main.post(() -> call.resolve(privacyState()));
    }

    @PluginMethod
    public void showPrivacyOptions(PluginCall call) {
        main.post(() -> {
            if (destroyed || showingForm || !privacyState().optBoolean("required")) {
                call.reject("광고 개인정보 선택을 지금 열 수 없어요.");
                return;
            }
            showingForm = true;
            clearBanner();
            UserMessagingPlatform.showPrivacyOptionsForm(getActivity(), error -> {
                showingForm = false;
                if (error == null) call.resolve();
                else call.reject("광고 개인정보 선택을 불러올 수 없어요. 잠시 후 다시 시도해 주세요.");
                if (destroyed) return;
                notifyListeners("privacyChanged", privacyState());
                reconcile();
            });
        });
    }

    @PluginMethod
    public void setCompletedScreen(PluginCall call) {
        boolean visible = Boolean.TRUE.equals(call.getBoolean("visible"));
        main.post(() -> {
            completed = visible;
            if (completed) reconcile();
            else clearBanner();
            call.resolve();
        });
    }

    private void reconcile() {
        if (destroyed || !completed || !resumed || !updated || showingForm) return;
        if (!consentChecked) {
            showingForm = true;
            UserMessagingPlatform.loadAndShowConsentFormIfRequired(getActivity(), error -> {
                showingForm = false;
                consentChecked = true;
                if (destroyed) return;
                notifyListeners("privacyChanged", privacyState());
                reconcile();
            });
            return;
        }
        if (!consent.canRequestAds() || initializing) return;
        float density = getContext().getResources().getDisplayMetrics().density;
        int available = (int) (page.getWidth() / density);
        int width = available >= 468 ? 468 : available >= 320 ? 320 : 0;
        if (width == attemptedWidth) return;
        clearBanner();
        if (width == 0) return;

        if (!MobileAds.isInitialized()) {
            initializing = true;
            Context app = getContext().getApplicationContext();
            CompletableFuture.runAsync(() -> {
                synchronized (CardTalkAds.class) {
                    if (!MobileAds.isInitialized()) {
                        MobileAds.initialize(app, new InitializationConfig.Builder(app.getString(R.string.admob_app_id)).build());
                    }
                }
            }).whenComplete((unused, error) -> main.post(() -> {
                initializing = false;
                if (error == null) reconcile();
                else Log.w("CardTalkAds", "SDK initialization failed", error);
            }));
            return;
        }

        attemptedWidth = width;
        AdSize size = width == 468 ? AdSize.FULL_BANNER : AdSize.BANNER;
        AdView view = new AdView(getActivity());
        ad = view;
        int height = width == 468 ? 60 : 50;
        slot.addView(view, new FrameLayout.LayoutParams(Math.round(width * density), Math.round(height * density), Gravity.CENTER_HORIZONTAL));
        slot.setVisibility(View.INVISIBLE);
        view.loadAd(new BannerAdRequest.Builder(getContext().getString(R.string.admob_finish_banner_id), size).build(),
            new AdLoadCallback<BannerAd>() {
                @Override public void onAdLoaded(@NonNull BannerAd banner) {
                    main.post(() -> {
                        if (ad != view) return;
                        slot.setVisibility(View.VISIBLE);
                        Log.i("CardTalkAds", "Finish banner loaded");
                    });
                }
                @Override public void onAdFailedToLoad(@NonNull LoadAdError error) {
                    main.post(() -> {
                        if (ad != view) return;
                        clearBanner();
                        attemptedWidth = width;
                        Log.i("CardTalkAds", "Finish banner unavailable: " + error.getCode());
                    });
                }
            });
    }

    private void clearBanner() {
        AdView previous = ad;
        ad = null;
        attemptedWidth = 0;
        if (previous != null) {
            slot.removeView(previous);
            previous.destroy();
        }
        if (slot != null) slot.setVisibility(View.GONE);
    }

    @PluginMethod
    public void shareInvite(PluginCall call) {
        String question = call.getString("question", "");
        main.post(() -> {
            boolean english = "en".equals(call.getString("language"));
            String text = english ? "Shall we start our next gathering with this question?\n“" + question + "”\nCardTalk · One phone, a table of stories" : "다음 모임에서 이 질문으로 시작해 볼래요?\n“" + question + "”\n카드톡 · 휴대폰 한 대로 하는 대화 카드";
            boolean debug = (getContext().getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
            if (!debug && installedFromPlay()) {
                Uri listing = Uri.parse("https://play.google.com/store/apps/details").buildUpon()
                    .appendQueryParameter("id", getContext().getPackageName())
                    .appendQueryParameter("utm_source", "cardtalk")
                    .appendQueryParameter("utm_campaign", "group_invite").build();
                text += "\n" + listing;
            }
            Intent intent = new Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, text);
            try {
                getActivity().startActivity(Intent.createChooser(intent, english ? "Share CardTalk" : "모임에 카드톡 공유"));
                call.resolve();
            } catch (android.content.ActivityNotFoundException error) {
                call.reject("공유할 수 있는 앱을 찾지 못했어요.", error);
            }
        });
    }

    @SuppressWarnings("deprecation")
    private boolean installedFromPlay() {
        PackageManager packages = getContext().getPackageManager();
        String name = getContext().getPackageName();
        try {
            String installer = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R
                ? packages.getInstallSourceInfo(name).getInstallingPackageName()
                : packages.getInstallerPackageName(name);
            return "com.android.vending".equals(installer);
        } catch (PackageManager.NameNotFoundException error) {
            return false;
        }
    }

    @Override protected void handleOnResume() { resumed = true; reconcile(); }
    @Override protected void handleOnPause() { resumed = false; }
    @Override protected void handleOnDestroy() {
        destroyed = true;
        if (page != null) page.removeOnLayoutChangeListener(resize);
        clearBanner();
    }
}
