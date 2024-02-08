//
//  ContentView.swift
//  cardTalk
//
//  Created by yook on 2/4/24.
//
import SwiftUI

struct MainaView: View {
    @State private var isFaithButtonClickState = false
    @State private var isLifeButtonClickState = false
    @State private var isHideDummyCardsState = false
    @State private var isFlipedState = false
    @State private var rotationAngle: Double = 0
    @State private var isAnimating = false // 애니메이션 진행 중인지 여부

    var body: some View {
        ZStack {
            BackgroundGradientView()
            VStack(spacing: 20) {
                CardSelectionView()
                if !isLifeButtonClickState && !isFaithButtonClickState {
                    CardOptionView(title: "신앙 질문", isFlipped: $isFaithButtonClickState, isAnimating: $isAnimating)
                }
                if !isFaithButtonClickState && !isLifeButtonClickState {
                    CardOptionView(title: "일상 질문", isFlipped: $isLifeButtonClickState, isAnimating: $isAnimating)
                }
            }
        }
        .disabled(isAnimating) // 애니메이션 중에는 모든 입력 비활성화
    }
}


struct CardSelectionView: View {
    var body: some View {
        Text("카드를 골라보세요")
            .font(.title.bold())
            .padding(20)
            .shadow(radius: 5)
    }
}

struct CardOptionView: View {
    let title: String
    @Binding var isFlipped: Bool
    @Binding var isAnimating: Bool

    var body: some View {
        Button(action: {
            triggerAnimation()
        }) {
            Text(title)
                .font(.title.bold())
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(LinearGradient(gradient: Gradient(colors: [Color.orange, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
                .foregroundColor(.white)
                .cornerRadius(10)
                .padding(20)
                .shadow(radius: 10)
                .rotation3DEffect(.degrees(isFlipped ? -180 : 0), axis: (x: 0, y: 1, z: 0))
        }
    }

    private func triggerAnimation() {
        withAnimation(.easeInOut(duration: 0.75)) {
            isAnimating = true
            isFlipped.toggle()
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                isAnimating = false
            }
        }
    }
}

#Preview {
    MainaView()
}
