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
    
    var body: some View {
        ZStack {
            // 메인 버튼들
            VStack {
                Spacer()
                
                HStack {
                    Button("일상 질문") {
                        showQuestion(from: dailyQuestions)
                    }
                    .buttonStyle(CardButtonStyle())
                    
                    Button("신앙 질문") {
                        showQuestion(from: faithQuestions)
                    }
                    .buttonStyle(CardButtonStyle())
                    
                    Button("랜덤 질문") {
                        showQuestion(from: randomQuestions)
                    }
                    .buttonStyle(CardButtonStyle())
                }
                .padding()
            }
            
            // 질문 카드 뷰
            if showCard, let question = currentQuestion {
                QuestionCardView(question: question) {
                    withAnimation {
                        showCard = false
                    }
                }
                .transition(.move(edge: .bottom))
                .padding()
            } else {
                DummyCardView(){
                    withAnimation {
                        showQuestion(from: randomQuestions)
                        showCard = true
                    }
                }
                .transition(.move(edge: .bottom))
                .padding()
            }
        }
    }
    
    // 질문을 랜덤하게 선택하고 카드를 표시하는 함수
    func showQuestion(from questions: [String]) {
        currentQuestion = questions.randomElement()
        withAnimation {
            showCard = true
        }
    }
}


// 카드 뷰 정의
struct DummyCardView: View {
    var onDismiss: () -> Void
    var title = "버튼"
    var body: some View {
        VStack {
            Spacer()
            Text("question")
                .padding(20)
            Spacer()
            HStack {
                Button {
                    onDismiss()
                } label: {
                    Text("title1")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(Color.orange)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                        .padding(20)
                }.aspectRatio(2/3, contentMode: .fit)

                Button {
                    onDismiss()
                } label: {
                    Text("title2")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(Color.orange)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                        .padding(20)
                }.aspectRatio(2/3, contentMode: .fit)
                
            }
            Button {
                onDismiss()
            } label: {
                Text("title3")
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color.orange)
            .foregroundColor(.white)
            .cornerRadius(10)
            .padding(20)

        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.white)
        .foregroundColor(.black)
        .cornerRadius(20)
        .shadow(radius: 5)
    }
}


// 카드 뷰 정의
struct QuestionCardView: View {
    let question: String
    var onDismiss: () -> Void
    
    var body: some View {
        VStack {
            Spacer()
            Text(question)
                .padding(20)
            Spacer()
            Button("닫기", action: onDismiss)
                .padding(20)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.white)
        .foregroundColor(.black)
        .cornerRadius(20)
        .shadow(radius: 5)
        //.frame(maxWidth: .infinity, maxHeight: .infinity)
        //.background(Color.black.opacity(0.5))
        //.edgesIgnoringSafeArea(.all)
    }
}

// 버튼 스타일 정의
struct CardButtonStyle: ButtonStyle {
    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.orange)
            .foregroundColor(.white)
            .cornerRadius(10)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}
