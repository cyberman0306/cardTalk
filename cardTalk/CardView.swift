//
//  CardView.swift
//  cardTalk
//
//  Created by yook on 2/9/24.
//

import SwiftUI

struct CardView: View {
    @Binding var isHideDummyCardsState: Bool
    @Binding var isWorkingState: Bool
    @Binding var isLifeButtonClickState: Bool
    @Binding var isFlipedState: Bool
    @Binding var rotationAngle: Double
    var body: some View {
        ZStack {
            if !isHideDummyCardsState {
                withAnimation(.easeInOut(duration: 0.75)) {
                    Rectangle()
                        .fill(LinearGradient(gradient: Gradient(colors: [Color.green, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .foregroundColor(.brown)
                        .cornerRadius(10)
                        .padding(20)
                        .shadow(radius: 15)
                        .offset(CGSize(width: 10.0, height: 10.0))
                        .aspectRatio(66/88, contentMode: .fit)
                }
                
            }
            
            ZStack {
                Button {
                    if !isWorkingState {
                        isWorkingState = true
                        withAnimation(.easeInOut(duration: 0.75)) {
                            isHideDummyCardsState = true
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                withAnimation(.easeInOut(duration: 0.75)) {
                                    isLifeButtonClickState = true
                                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                        withAnimation(.easeInOut(duration: 0.75)) {
                                            isFlipedState = true
                                            rotationAngle = -180
                                            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                                isWorkingState = false
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                } label: {
                    Text("일상 질문")
                        .font(.title.bold())
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(LinearGradient(gradient: Gradient(colors: [Color.green, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
                        .foregroundColor(.white)
                        .cornerRadius(10)
                        .padding(20)
                        .shadow(radius: 10)
                        .opacity(isFlipedState ? 0 : 1)
                }
                
                if isFlipedState {
                    VStack {
                        ZStack {
                            VStack {
                                Spacer()
                                Text("질문 내용")
                                    .font(.title.bold())
                                    .foregroundColor(.white)
                                Spacer()
                            }
                            VStack {
                                HStack {
                                    if !isWorkingState {
                                        Button {
                                            // 여기서 뱅글 뱅글 할필요없이 뷰 없앴다가 나타나게하면됨
                                            withAnimation(.easeInOut(duration: 0.75)) {
                                                isWorkingState = true
                                                isFlipedState = false
                                                rotationAngle = 0
                                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                                    withAnimation(.easeInOut(duration: 0.75)) {
                                                        isLifeButtonClickState = false
                                                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                                            withAnimation(.easeInOut(duration: 0.75)) {
                                                                isHideDummyCardsState = false
                                                                isWorkingState = false
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } label: {
                                            Text("X").bold()
                                        }
                                    }
                                    Spacer()
                                    if !isWorkingState {
                                        Button {
                                            // 다시 한바퀴 돌리는 로직
                                            withAnimation(.easeInOut(duration: 0.25)) {
                                                isWorkingState = true
                                            }
                                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
                                                withAnimation(.easeInOut(duration: 0.75)) {
                                                    rotationAngle -= 180
                                                    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                                        isWorkingState = false
                                                    }
                                                }
                                            }
                                        } label: {
                                            Text("다시뽑기")
                                        }
                                    }
                                }.padding()
                                Spacer()
                            }
                            
                        }
                        
                        
                        
                    }
                    .rotation3DEffect(.degrees(rotationAngle), axis: (x: 0, y: 1, z: 0))
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(LinearGradient(gradient: Gradient(colors: [Color.white, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
                
                    .cornerRadius(10)
                    .padding(20)
                    .shadow(radius: 10)
                
                }
                
            }
            .rotation3DEffect(.degrees(rotationAngle), axis: (x: 0, y: 1, z: 0))
            .aspectRatio(66/88, contentMode: .fit)
        }
        .aspectRatio(66/88, contentMode: .fit)
    }
}

