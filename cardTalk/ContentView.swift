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
                QuestionCardView(question: question, title: pickedCardTitle) {
                    withAnimation {
                        showCard = false
                    }
                }
                .transition(.move(edge: .bottom))
                .padding()
            } else {
                DummyCardView(){ name in
                    pickedCardTitle = name
                    withAnimation {
                        if name == "일상 질문" {
                            showQuestion(from: dailyQuestions)
                        } else {
                            showQuestion(from: faithQuestions)
                        }
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
    var onDismiss: (String) -> Void
    var title = "버튼"
    var body: some View {
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
                        onDismiss("신앙 질문")
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
                    
                    
                }
                .aspectRatio(66/88, contentMode: .fit)
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
                        onDismiss("일상 질문")
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


// 카드 뷰 정의
struct QuestionCardView: View {
    let question: String
    var title: String
    var onDismiss: () -> Void
    
    var body: some View {
        VStack {
            Text(title)
                .padding(50)
            Spacer()
            Text(question)
                .padding()
            Spacer()
            Button("닫기", action: onDismiss)
                .padding(50)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.white)
        .foregroundColor(.black)
        .cornerRadius(20)
        .shadow(radius: 5)
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

// 배경 그라데이션 뷰
struct BackgroundGradientView: View {
    var body: some View {
        LinearGradient(gradient: Gradient(colors: [Color.yellow.opacity(0.5), Color.purple.opacity(0.5)]), startPoint: .topLeading, endPoint: .bottomTrailing)
            .edgesIgnoringSafeArea(.all)
    }
}

// 예시: 텍스트에 그라데이션 적용을 위한 확장
extension View {
    func gradientForegroundCustom(colors: [Color]) -> some View {
        self.overlay(LinearGradient(gradient: Gradient(colors: colors), startPoint: .topLeading, endPoint: .bottomTrailing))
            .mask(self)
    }
}
extension View {
    func gradientForeground(colors: [Color]) -> some View {
        self.overlay(LinearGradient(gradient: Gradient(colors: colors), startPoint: .topLeading, endPoint: .bottomTrailing))
            .mask(self)
    }
}

#Preview {
    ContentView()
}

struct ContentaView: View {
    @State private var flipped = false
    @State private var animate3d = false

    var body: some View {
        VStack {
            Spacer()
            
            // 3D 플립 애니메이션을 적용할 뷰
            ZStack {
                if flipped {
                    DetailView()
                        .frame(width: 200, height: 200)
                        .transition(.opacity)
                        .rotation3DEffect(.degrees(animate3d ? 180 : 0), axis: (x: 0, y: 1, z: 0))
                } else {
                    Button("신앙 질문") {
                        withAnimation(.easeInOut(duration: 0.5)) {
                            animate3d.toggle()
                        }
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
                            withAnimation(.easeInOut) {
                                flipped.toggle()
                            }
                        }
                    }
                    .frame(width: 200, height: 200)
                    .background(LinearGradient(gradient: Gradient(colors: [Color.red, Color.orange]), startPoint: .topLeading, endPoint: .bottomTrailing))
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .shadow(radius: 10)
                    .rotation3DEffect(.degrees(animate3d ? 0 : -180), axis: (x: 0, y: 1, z: 0))
                }
            }
            .frame(width: 200, height: 200)
            .onTapGesture {
                flipped.toggle()
            }
            
            Spacer()
        }
    }
}

struct DetailView: View {
    var body: some View {
        VStack {
            Text("세부 정보")
                .foregroundColor(.white)
                .font(.title)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.blue)
        .cornerRadius(10)
    }
}
