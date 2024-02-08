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
                            Text("카드를 골라보세요")
                                .font(.title.bold())
                                .padding(20)
                                .shadow(radius: 5)
                            Spacer()
                        }
                        
                        HStack {
                            Spacer()
                            if !isLifeButtonClickState {
                                ZStack {
                                    if !isHideDummyCardsState {
                                        withAnimation(.easeInOut(duration: 0.75)) {
                                            Rectangle()
                                                .fill(LinearGradient(gradient: Gradient(colors: [Color.orange, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                                .foregroundColor(.brown)
                                                .cornerRadius(10)
                                                .padding(20)
                                                .shadow(radius: 15)
                                                .offset(CGSize(width: 10.0, height: 10.0))
                                        }
                                    }
                                    ZStack {
                                        if isFaithButtonClickState {
                                            VStack {
                                                Button {
                                                    withAnimation(.easeInOut(duration: 0.75)) {
                                                        isFaithButtonClickState = false
                                                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                                            withAnimation(.easeInOut(duration: 0.25)) {
                                                                isHideDummyCardsState = false
                                                            }
                                                            
                                                        }
                                                    }
                                                } label: {
                                                    Text("기도 자주 하나요?")
                                                        .font(.title.bold())
                                                        .foregroundColor(.white)
                                                }
                                            }
                                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                                            .background(LinearGradient(gradient: Gradient(colors: [Color.orange, Color.red]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                            .cornerRadius(10)
                                            .padding(20)
                                            .shadow(radius: 10)
                                            
                                            .rotation3DEffect(.degrees(isFaithButtonClickState ? -180 : 0), axis: (x: 0, y: 1, z: 0))
                                        } else {
                                            Button {
                                                withAnimation(.easeInOut(duration: 0.25)) {
                                                    isHideDummyCardsState = true
                                                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
                                                        withAnimation(.easeInOut(duration: 0.75)) {
                                                            isFaithButtonClickState = true
                                                        }
                                                    }
                                                }
                                                
                                                
                                                
                                                
                                            } label: {
                                                Text("신앙 질문")
                                                    .font(.title.bold())
                                                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                                                    .background(LinearGradient(gradient: Gradient(colors: [Color.orange, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                                    .foregroundColor(.white)
                                                    .cornerRadius(10)
                                                    .padding(20)
                                                    .shadow(radius: 10)
                                            }
                                        }
                                        
                                        
                                    }
                                    .rotation3DEffect(.degrees(isFaithButtonClickState ? -180 : 0), axis: (x: 0, y: 1, z: 0))
                                }
                                .aspectRatio(66/88, contentMode: .fit)
                            }
                            if !isFaithButtonClickState && !isLifeButtonClickState {
                                Spacer()
                            }
                            if !isFaithButtonClickState {
                                CardView(isHideDummyCardsState: $isHideDummyCardsState,
                                         isWorkingState: $isWorkingState, isLifeButtonClickState: $isLifeButtonClickState, 
                                         isFlipedState: $isFlipedState, rotationAngle: $rotationAngle)
                            }
                            Spacer()
                        }
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
