//
//  mainView.swift
//  cardTalk
//
//  Created by yook on 2/7/24.
//

import SwiftUI

struct mainView: View {
    @State var isFaithButtonClickState: Bool = false
    @State var isLifeButtonClickState: Bool = false
    @State var isHideDummyCardsState: Bool = false
    @State var isFlipedState: Bool = false // 뒤집기 버튼 작동 시작 했는지
    @State var isRetryState: Bool = false
    @State var isWorkingState: Bool = false
    @State var rotationAngle: Double = 0
    var body: some View {
        ZStack {
            BackgroundGradientView()
            VStack {
                HStack {
                    Spacer()
                    VStack {
                        Spacer()
                        if !isFaithButtonClickState && !isLifeButtonClickState {
                            Text("나눔 카드를 고르세요")
                                .font(.title.bold())
                                .padding(20)
                                .shadow(radius: 5)
                            Spacer()
                        }
                        
                        HStack {
                            if !isLifeButtonClickState {
                                CardView(cardTitle: "신앙 질문",
                                         isHideDummyCardsState: $isHideDummyCardsState,
                                         isWorkingState: $isWorkingState, CardType: $isFaithButtonClickState,
                                         isFlipedState: $isFlipedState, rotationAngle: $rotationAngle)
                            }
                            if !isFaithButtonClickState && !isLifeButtonClickState {
                                Spacer()
                            }
                            if !isFaithButtonClickState {
                                CardView(cardTitle: "일상질문",
                                         isHideDummyCardsState: $isHideDummyCardsState,
                                         isWorkingState: $isWorkingState, CardType: $isLifeButtonClickState,
                                         isFlipedState: $isFlipedState, rotationAngle: $rotationAngle)
                            }
                        }
                        .padding()
                        Spacer()
                    }
                    Spacer()
                }
            }
        }
        
    }
}


// 배경 그라데이션 뷰
struct BackgroundGradientView: View {
    var body: some View {
        LinearGradient(gradient: Gradient(colors: [Color.yellow.opacity(0.5), Color.purple.opacity(0.5)]), startPoint: .topLeading, endPoint: .bottomTrailing)
            .edgesIgnoringSafeArea(.all)
    }
}

#Preview {
    mainView()
}
