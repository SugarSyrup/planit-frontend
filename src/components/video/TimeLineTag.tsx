import React from "react";
import styled from "styled-components";
import ReactGA from "react-ga4";

//recoil
import { useSetRecoilState, useRecoilState } from "recoil";
import { placeDetailSliderIdx } from "../../recoil/placeDetailSliderIdxState";
import { myTripState, idState } from "../../recoil/myTripState";

//svg
import MarketIcon from "../../assets/svg/placetType/MarketIcon.svg";
import FillWhiteCirclePlusIcon from "../../assets/svg/FillWhiteCirclePlusIcon.svg";
import FillPrimaryCirclePlusIcon from "../../assets/svg/FillPrimaryCirclePlusIcon.svg";
import MessageDetailIcon from "../../assets/svg/MessageDetailIcon.svg";
import { sliderTimeState, timelineIdx } from "../../recoil/timelineIdx";

type TimeLineTagProps = {
	index: number;
	place: string;
	placeType: string;
	Icon: React.ReactNode;
	iscenter: boolean;
	time: number;
};

function TimeLineTag({
	index,
	place,
	placeType,
	Icon,
	time,
	iscenter,
}: TimeLineTagProps) {
	const setPlaceDetailSliderIdx = useSetRecoilState(placeDetailSliderIdx);
	const setMyTrip = useSetRecoilState(myTripState);
	const setCenterIdx = useSetRecoilState(timelineIdx);
	const setCurrentTime = useSetRecoilState(sliderTimeState);
	const [id, setId] = useRecoilState(idState);
	return (
		<TagWrapper iscenter={iscenter}>
			<Content
				iscenter={iscenter}
				onClick={() => {
					ReactGA.event({
						category: "Event",
						action: "TimeLine Btn",
						label: "타임라인 태그 클릭",
					});
					setCurrentTime(time);
					setPlaceDetailSliderIdx(index);
					setCenterIdx(index);
				}}
			>
				<MessageDetailIcon className="infoBtn" />
				<VerticalLine />
				<div className="textContainer">
					<span className="place">{place}</span>
					<span className="type">{placeType}</span>
				</div>
				<BackgroundIconWrapper>{Icon}</BackgroundIconWrapper>
			</Content>
			{iscenter ? (
				<FillPrimaryCirclePlusIcon
					className="plusBtn"
					onClick={() => {
						ReactGA.event({
							category: "Event",
							action: "TimeLine Add Place Btn",
							label: "타임라인 장소 추가 버튼 클릭",
						});
						setMyTrip((prev) => [
							...prev,
							{
								id: id,
								icon: <MarketIcon />,
								placeName: place,
							},
						]);
						setId((prev) => prev + 1);
					}}
				/>
			) : (
				<FillWhiteCirclePlusIcon
					className="plusBtn"
					onClick={() => {
						ReactGA.event({
							category: "Event",
							action: "TimeLine Add Place Btn",
							label: "타임라인 장소 추가 버튼 클릭",
						});
						setMyTrip((prev) => [
							...prev,
							{
								id: id,
								icon: <MarketIcon />,
								placeName: place,
							},
						]);
						setId((prev) => prev + 1);
					}}
				/>
			)}
		</TagWrapper>
	);
}

const VerticalLine = styled.div`
	height: 40px;
	border-left: 0.25px solid #d9d9d9;
	margin-left: 4px;
	margin-right: 8px;
`;

const TagWrapper = styled.div<{ iscenter: boolean }>`
	width: 240px;
	height: 66px;
	border-radius: 6px;
	background-color: ${(props) =>
		props.iscenter ? "white" : props.theme.primary};

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	position: relative;

	border: 0.25px solid #d6d6d9;
	border-radius: 6px;
	.plusBtn {
		margin-right: 10px;
		cursor: pointer;
	}
`;

const Content = styled.div<{ iscenter?: boolean }>`
	width: 200px;
	height: 66px;
	background-color: ${(props) =>
		props.iscenter ? props.theme.primary : "white"};
	border-radius: 6px;
	border: 0.25px solid #d6d6d9;
	box-shadow: 6px 0px 4px -2px rgba(0, 0, 0, 0.2);

	box-sizing: border-box;
	padding-left: 4px;

	display: flex;
	align-items: center;
	cursor: pointer;

	.infoBtn {
		width: 32px;
		height: 32px;
		color: ${(props) => (props.iscenter ? "white" : "grey")};
		margin-right: 0px;
		z-index: 10;

		flex-shrink: 0;
	}

	.textContainer {
		display: flex;
		flex-direction: column;
		gap: 4px;

		.place {
			font-size: 20px;
			font-weight: 600;
			letter-spacing: -0.5px;
			color: ${(props) => (props.iscenter ? "white" : "black")};
		}

		.type {
			font-size: 14px;
			font-weight: 400;
			letter-spacing: -0.35px;
			color: ${(props) =>
				props.iscenter ? "white" : props.theme.titleSecondary};
		}
	}
`;

const BackgroundIconWrapper = styled.div`
	svg {
		width: 60px;
		height: 60px;
		position: absolute;
		right: 40px;
		bottom: 0px;
		filter: grayscale(90%) opacity(10%);
	}
`;

export default TimeLineTag;
