//
//  ContentView.swift
//  cardTalk
//
//  Created by yook on 2/4/24.
//

import SwiftUI

struct ContentView: View {
    @State private var showCard = false
    @State private var cardText = ""

    let questions = [
        "일상": ["오늘 가장 기억에 남는 일은?", "최근에 본 가장 재미있는 영화는?"],
        "신앙": ["삶에서 믿음이 어떤 의미인가요?", "마지막으로 기도한 것은 언제인가요?"],
        "랜덤": ["좋아하는 색깔은 무엇인가요?", "언제 가장 행복하다고 느끼나요?"]
    ]

    var body: some View {
        ZStack {
            // 카드 뷰
            if showCard {
                RoundedRectangle(cornerRadius: 25.0)
                    .frame(width: 300, height: 200)
                    .foregroundColor(.white)
                    .shadow(radius: 5)
                    .overlay(
                        Text(cardText)
                            .padding()
                    )
                    .transition(.scale)
            }
            
            VStack {
                Spacer()
                // 하단 버튼들
                HStack {
                    Button("일상용 질문") {
                        showCardWithQuestion(type: "일상")
                    }
                    .buttonStyle(CardButtonStyle())

                    Button("신앙용 질문") {
                        showCardWithQuestion(type: "신앙")
                    }
                    .buttonStyle(CardButtonStyle())

                    Button("랜덤 질문") {
                        showCardWithQuestion(type: "랜덤")
                    }
                    .buttonStyle(CardButtonStyle())
                }
                .padding(.bottom)
            }
        }
    }

    func showCardWithQuestion(type: String) {
        if let questionsOfType = questions[type], !questionsOfType.isEmpty {
            let randomIndex = Int.random(in: 0..<questionsOfType.count)
            cardText = questionsOfType[randomIndex]
            withAnimation {
                showCard = true
            }
        }
    }
}

struct CardButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
    }
}
