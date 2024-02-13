//
//  ButtonLabelView.swift
//  cardTalk
//
//  Created by yook on 2/9/24.
//

import SwiftUI

struct ButtonLabelView: View {
    var title: String

    var body: some View {
        VStack {
            VStack {
                Spacer()
                Text(title)
                    .font(.title.bold())
                    .foregroundColor(.white)
                Spacer()

            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .aspectRatio(66/88, contentMode: .fit)
            .overlay(
                RoundedRectangle(cornerRadius: 10) // 모서리가 둥근 사각형을 그립니다.
                    .stroke(Color.white, lineWidth: 2) // 테두리의 색상과 두께를 지정합니다.
                    .aspectRatio(66/88, contentMode: .fit)
            )
            .padding()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(LinearGradient(gradient: Gradient(colors: [Color.green, Color.yellow]),
                                   startPoint: .topLeading, endPoint: .bottomTrailing))
        .cornerRadius(10)
        .shadow(radius: 10)
        .aspectRatio(66/88, contentMode: .fit)
    }

}


#Preview {
    ButtonLabelView(title: "버튼 라벨")
}
