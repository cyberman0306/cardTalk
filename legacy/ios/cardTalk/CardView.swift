//
//  CardView.swift
//  cardTalk
//
//  Created by yook on 2/9/24.
//

import SwiftUI

struct CardView: View {
    var cardTitle = ""
    @Binding var isHideDummyCardsState: Bool
    @Binding var isWorkingState: Bool
    @Binding var CardType: Bool
    @Binding var isFlipedState: Bool
    @Binding var rotationAngle: Double
    @State var ButtonLabelViewOpacity: Bool = false
    @State var CardViewOpacity: Bool = false
    var body: some View {
        ZStack {
            if !isHideDummyCardsState {
                withAnimation(.easeInOut(duration: 0.75)) {
                    DummyCardsView()
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
                                    CardType = true
                                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                        withAnimation(.easeInOut(duration: 0.75)) {
                                            ButtonLabelViewOpacity = true
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
                    ButtonLabelView(title: cardTitle)
                        .opacity(ButtonLabelViewOpacity ? 0 : 1)
                }
                if isFlipedState {
                    ZStack {
                        ButtonLabelView(title: "질문 내용")
                        VStack {
                            HStack {
                                if !isWorkingState {
                                    Button {
                                        // 여기서 뱅글 뱅글 할필요없이 뷰 없앴다가 나타나게하면됨
                                        withAnimation(.easeInOut(duration: 0.75)) {
                                            isWorkingState = true
                                            CardViewOpacity = true
                                        }
                                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                            rotationAngle = 0
                                            withAnimation(.easeInOut(duration: 0.75)) {
                                                isFlipedState = false
                                                ButtonLabelViewOpacity = false
                                                CardType = false
                                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                                    withAnimation(.easeInOut(duration: 0.75)) {
                                                        isHideDummyCardsState = false
                                                        isWorkingState = false
                                                        CardViewOpacity = false
                                                    }
                                                }
                                            }
                                        }
                                        
                                    } label: {
                                        Image(systemName: "arrowshape.backward")
                                            .foregroundColor(.white)
                                            .imageScale(.large)
                                    }
                                }
                                Spacer()
                                if !isWorkingState {
                                    Button {
                                        // 다시 한바퀴 돌리는 로직
                                        withAnimation(.easeInOut(duration: 0.25)) {
                                            isWorkingState = true
                                        }
                                    
                                        withAnimation(.easeInOut(duration: 0.75)) {
                                            rotationAngle -= 360
                                            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                                isWorkingState = false
                                            }
                                        }
                                        
                                    } label: {
                                        Image(systemName: "arrow.clockwise")
                                            .foregroundColor(.white)
                                            .imageScale(.large)

                                    }
                                }
                            }
                            .padding(40)
                            Spacer()
                        }
                    }
                    .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
                
                }
                
            }
            .rotation3DEffect(.degrees(rotationAngle), axis: (x: 0, y: 1, z: 0))
            .aspectRatio(66/88, contentMode: .fit)
            //.background(.red)
            .opacity(CardViewOpacity ? 0 : 1)
        }
        .aspectRatio(66/88, contentMode: .fit)
    }
}


struct DummyCardsView: View {
    var body: some View {
        Rectangle()
            .fill(LinearGradient(gradient: Gradient(colors: [Color.green, Color.yellow]), startPoint: .topLeading, endPoint: .bottomTrailing))
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .foregroundColor(.brown)
            .cornerRadius(10)
            .shadow(radius: 15)
            .offset(CGSize(width: 10.0, height: 10.0))
            .aspectRatio(66/88, contentMode: .fit)
    }
}
