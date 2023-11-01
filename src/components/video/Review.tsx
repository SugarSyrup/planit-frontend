import React from "react";
import styled from "styled-components";
import StarIcon from "../../assets/svg/StarIcon.svg";

export type reviewType = {
	authorAttribution: {
		displayName: string;
		uri: string;
		photoUri: string;
	};
	name: string;
	text: {
		languagueCode: string;
		text: string;
	};
	rating: number;
	relativePublishTimeDescription: string;
};

function Review(props: reviewType) {
	return (
		<Container>
			<img
				src={`https://places.googleapis.com/v1/places/ChIJl8gXNgvpaDURP6m_S0gwF74/photos/AcJnMuGS49HzvZKuMrIHx3EFy2pw1KurbIzytZPDZ2ENJ0SC4tSUMxRiOmsV_yLIneUWzwaesXnooGOhCGXU6WVcJQCqfWuATpWWETXhQUjL8B66_BzIVPdKrYqoeeOusAg2y6CzVrq37sBGgfABonJa3MA9GoESKesHStou/media?maxHeightPx=185&maxWidthPx=185&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
				alt=""
				className="placeThumbnail"
			/>
			<TextContainer>
				<AuthorContainer>
					<img
						src={props.authorAttribution.photoUri}
						alt="thumbnail"
					/>
					<div className="authorTextContainer">
						<span className="authorName">
							{props.authorAttribution.displayName}
						</span>
						<span className="counts">리뷰 278개 ∙ 사진 47장</span>
					</div>
				</AuthorContainer>
				<ReviewDesc>
					{/*<span>{props.rating}</span> */}
					<span>
						<StarIcon />
						<StarIcon />
						<StarIcon />
						<StarIcon />
						<StarIcon />
					</span>
					<span>{props.relativePublishTimeDescription}</span>
				</ReviewDesc>
				<span className="reviewText">{props.text.text}</span>
			</TextContainer>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	gap: 32px;
	margin-bottom: 47px;
	padding-left: 84px;
	padding-right: 84px;

	.placeThumbnail {
		width: 185px;
		height: 185px;
	}
`;

const AuthorContainer = styled.div`
	display: flex;
	gap: 15px;

	.authorTextContainer {
		display: flex;
		flex-direction: column;
		gap: 5px;
		margin-bottom: 16px;

		.authorName {
			color: ${({ theme }) => theme.textPrimary};
			font-size: 20px;
			font-weight: 600;
			font-style: normal;
		}

		.counts {
			color: ${({ theme }) => theme.titlePrimary};
			font-size: 16px;
			font-weight: 300;
			font-style: normal;
		}
	}
`;

const ReviewDesc = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 19.2px;
	font-weight: 300;
	color: ${({ theme }) => theme.titlePrimary};
	margin-bottom: 22px;
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	img {
		width: 46px;
		height: 46px;
		flex-shrink: 0;
	}

	.reviewText {
		font-size: 19.2px;
		color: ${({ theme }) => theme.textPrimary};
		line-height: 25px;
		letter-spacing: 0.96px;
		font-weight: 300;

		width: 100%;
		height: 75px;
		display: -webkit-box; // 얘네를 추가히준다
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export default Review;
