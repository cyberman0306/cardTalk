package HyunJun.cardTalk;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(android.os.Bundle savedInstanceState) {
        registerPlugin(CardTalkAds.class);
        super.onCreate(savedInstanceState);
    }
}
