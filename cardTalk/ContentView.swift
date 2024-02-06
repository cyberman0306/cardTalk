//
//  ContentView.swift
//  cardTalk
//
//  Created by yook on 2/4/24.
//

import SwiftUI

struct ContentView: View {
    // 질문들을 저장하는 배열
    let dailyQuestions = ["오늘 가장 기뻤던 순간은?", "가장 좋아하는 취미는?"]
    let faithQuestions = ["믿음이 당신의 일상에 어떤 영향을 미치나요?", "기도하는 시간이 왜 중요한가요?"]
    var randomQuestions: [String] {
        dailyQuestions + faithQuestions
    }
    
    // 현재 선택된 질문을 저장
    @State private var currentQuestion: String?
    // 카드 뷰를 보여줄지 말지 결정하는 변수
    @State private var showCard = false
    @State var pickedCardTitle = ""
    
    var body: some View {
        ZStack {
            BackgroundGradientView()
            if showCard, let question = currentQuestion {
                PickedQuestionCardView(question: question, title: pickedCardTitle) {
                    withAnimation {
                        showCard = false
                    }
                }
                .transition(.opacity)
                .rotation3DEffect(.degrees(showCard ? 0 : 180), axis: (x: 0, y: 1, z: 0))
                .padding()
            } else {
                SelectionCardView(showCard: $showCard){ name in
                    pickedCardTitle = name
                    if name == "일상 질문" {
                        showQuestion(from: dailyQuestions)
                    } else {
                        showQuestion(from: faithQuestions)
                    }
                }
                .padding()
            }
        }
    }
    
    // 질문을 랜덤하게 선택하고 카드를 표시하는 함수
    func showQuestion(from questions: [String]) {
        currentQuestion = questions.randomElement()
        showCard = true
    }
}


// 카드 뷰 정의
struct SelectionCardView: View {
    @Binding var showCard: Bool
    @State var animate3d: Bool = false
    @State var scale: CGFloat = 1
    @State var moveCenter: Bool = false
    var onDismiss: (String) -> Void
    var title = "버튼"
    var body: some View {
        GeometryReader { geometry in
            VStack {
                Spacer()
                Text("카드를 골라보세요")
                    .font(.title.bold())
                    .padding(20)
                    .shadow(radius: 5)
                Spacer()
                HStack {
                    ZStack{
                        VStack{
                            Rectangle()
                                .fill(LinearGradient(gradient: Gradient(colors: [Color.red, Color.orange]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .foregroundColor(.brown)
                                .cornerRadius(10)
                                .padding(20)
                                .shadow(radius: 15)
                                .offset(CGSize(width: 10.0, height: 10.0))
                                
                        }
                        Button {
                            withAnimation(.easeInOut(duration: 0.75)) {
                                animate3d.toggle()
                                scale = scale > 1 ? 1 : 2
                                moveCenter.toggle() // 중앙으로 이동
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                withAnimation(.easeInOut) {
                                    onDismiss("신앙 질문")
                                }
                            }
                           
                        } label: {
                            Text("신앙 질문")
                                .font(.title.bold())
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .background(LinearGradient(gradient: Gradient(colors: [Color.red, Color.orange]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                .foregroundColor(.white)
                                .cornerRadius(10)
                                .padding(20)
                                .shadow(radius: 10)
                                
                                
                        }
                        .scaleEffect(scale)
                        .rotation3DEffect(.degrees(animate3d ? -180 : 0), axis: (x: 0, y: 1, z: 0))
                        
                    }
                    .aspectRatio(66/88, contentMode: .fit)
                    .frame(width: geometry.size.width / 2, height: geometry.size.height / 2)
                    .position(x: geometry.size.width / 2, y: geometry.size.height / 2) // 화면 중앙으로 배치
                    
                    ZStack{
                        VStack{
                            Rectangle()
                                .fill(LinearGradient(gradient: Gradient(colors: [Color.green, Color.mint]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .foregroundColor(.orange)
                                .cornerRadius(10)
                                .padding(20)
                                .shadow(radius: 15)
                                .offset(CGSize(width: 10.0, height: 10.0))
                            
                        }
                        Button {
                            withAnimation(.easeInOut(duration: 0.75)) {
                                self.animate3d.toggle()
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                                withAnimation(.easeInOut) {
                                    onDismiss("일상 질문")
                                }
                            }
                        } label: {
                            Text("일상 질문")
                                .font(.title.bold())
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .background(LinearGradient(gradient: Gradient(colors: [Color.green, Color.mint]), startPoint: .topLeading, endPoint: .bottomTrailing))
                                .foregroundColor(.white)
                                .cornerRadius(10)
                                .padding(20)
                                .shadow(radius: 10)
                        }
                        .rotation3DEffect(.degrees(animate3d ? -180 : 0), axis: (x: 0, y: 1, z: 0))
                    }
                    .offset(CGSize(width: -5, height: 0))
                    .aspectRatio(66/88, contentMode: .fit)
                }
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(.white)
            .foregroundColor(.black)
            .cornerRadius(20)
            .shadow(radius: 20)
        }
    }
}

// 카드 뷰 정의
struct PickedQuestionCardView: View {
    let question: String
    var title: String
    var onDismiss: () -> Void
    
    var body: some View {
        VStack {
            Text(title)
                .font(.title.bold())
                .padding(50)
            Spacer()
            Text(question)
                .font(.title.bold())
                .padding()
            Spacer()
            Button("닫기", action: onDismiss)
                .font(.title.bold())
                .foregroundColor(.blue)
                .padding(50)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.white)
        .foregroundColor(.black)
        .cornerRadius(20)
        .shadow(radius: 5)
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
    ContentView()
}
