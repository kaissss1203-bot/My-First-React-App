'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Standalone SlideRight component 
const SlideRight = ({
	hide,
	children,
	start,
	finish,
	delay,
}: {
	readonly children: React.ReactNode;
	readonly delay?: number;
	readonly finish: number;
	readonly hide: boolean;
	readonly start: number;
}) => {
	const [xPosition, setXPosition] = useState(start);

	useEffect(() => {
		if (hide) setXPosition(start);
		else setXPosition(finish);
	}, [finish, hide, start]);

	return (
		<g
			style={{ transition: `transform ${delay ? delay / 1_000 : 0.5}s ease-in-out` }}
			transform={`translate(${xPosition}, 0)`}
		>
			{children}
		</g>
	);
};

// Standalone FadeIn component
const FadeIn = ({
	show,
	children,
	delay,
}: {
	readonly children: React.ReactNode;
	readonly delay?: number;
	readonly show: boolean;
}) => {
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		if (show) setOpacity(1);
		else setOpacity(0);
	}, [show]);

	return (
		<g opacity={opacity} style={{ transition: `opacity ${delay ? delay / 1_000 : 0.5}s ease-in-out` }}>
			{children}
		</g>
	);
};

// Default data types
interface Team {
	greyCards?: number;
	id?: string | null;
	name: string;
	redCards?: number;
	yellowCards?: number;
}

interface Colors {
	c1?: string;
	c2?: string;
	c3?: string;
	c4?: string;
	c5?: string;
	c6?: string;
	c7?: string;
	c8?: string;
}

interface TennisBlueScoreboardProps {
	readonly colors?: Colors;
	readonly isFirstServer?: boolean;
	readonly legs?: [number, number];
	readonly notice?: string;
	readonly onCollapse?: () => void; // Callback for when collapse animation starts
	readonly onExpand?: () => void; // Callback for when expand animation starts
	readonly sets?: [number, number];
	readonly showNotice?: boolean;
	// Optional props that default to demo values
	readonly teamA?: Team;
	readonly teamB?: Team;
	readonly tennisCurrentScore?: [number | string, number | string];
}

export function TennisBlueScoreboardStandalone({
	teamA = { name: 'Player A' },
	teamB = { name: 'Player B' },
	colors = {
		c1: '#ffffff',
		c2: '#1a1a1a',
		c3: '#3b82f6',
		c4: '#1e293b',
		c5: '#ffffff',
		c6: '#ffffff',
		c7: '#1a1a1a',
	},
	sets = [0, 0],
	legs = [0, 0],
	isFirstServer = true,
	notice = 'Match Point', 
	showNotice = true,
	tennisCurrentScore = [0, 0],
	onCollapse,
	onExpand,
}: TennisBlueScoreboardProps) {
	// Track animation state
	const [animationStep, setAnimationStep] = useState(3);

	// State for right section collapse animation
	const [isRightCollapsed, setIsRightCollapsed] = useState(false);

	// Animation effect - simplified for standalone use
	useEffect(() => {
		// Demo animation sequence on mount
		setTimeout(() => setAnimationStep(1), 0);
		setTimeout(() => setAnimationStep(2), 500);
		setTimeout(() => setAnimationStep(3), 1_000);
		setTimeout(() => setAnimationStep(4), 1_500);
	}, []);

	// Function to trigger collapse animation (can be called externally)
	const triggerCollapse = useCallback(() => {
		setIsRightCollapsed(true);
		onCollapse?.();
	}, [onCollapse]);

	// Function to trigger expand animation (reverse of collapse)
	const triggerExpand = useCallback(() => {
		setIsRightCollapsed(false);
		onExpand?.();
	}, [onExpand]);

	// Add collapse and expand triggers to window for demo purposes
	useEffect(() => {
		// @ts-ignore
		window.triggerTennisCollapse = triggerCollapse;
		// @ts-ignore
		window.triggerTennisExpand = triggerExpand;
		return () => {
			// @ts-ignore
			delete window.triggerTennisCollapse;
			// @ts-ignore
			delete window.triggerTennisExpand;
		};
	}, [onCollapse, onExpand]);

	return (
		<svg viewBox="0 0 354 108" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<style>
					{
						'.svg-TennisBlueScoreboard .cls-3,.svg-TennisBlueScoreboard .cls-4,.svg-TennisBlueScoreboard .cls-7{font-size:28px;font-family:Roboto-Medium,Roboto;font-weight:500} .svg-TennisBlueScoreboard .cls-5{letter-spacing:.00928em} .svg-TennisBlueScoreboard .cls-6{letter-spacing:-.07324em}'
					}
				</style>
				<style>
					{`
          .slide-notice {
            transition: transform 1s ease-in-out, opacity 1s ease-in-out;
            opacity: 0;
            transform: translateY(100%);
          }

          .slide-notice.show {
            opacity: 1;
            transform: translateY(0);
          }

          .slide-notice.hide {
            opacity: 0;
            transform: translateY(100%);
          }
        `}
				</style>
			</defs>
			{/* Notice banner - always visible when showNotice is true */}
			<g className={`slide-notice ${showNotice ? 'show' : 'hide'}`} id="tennis-blue-Notice">
				<path
					className="cls-2"
					d="M0 0h146v27H0z"
					data-name="small-white-bg"
					fill={colors.c4}
					id="tennis-blue-small-white-bg-2"
				/>
				<text
					fill={colors.c5}
					style={{
						fontSize: '17.1px',
						fontFamily: 'Roboto-Medium, Roboto',
						fontWeight: 500,
					}}
					textAnchor="middle"
					transform="translate(73 20.205)"
				>
					{notice}
				</text>
			</g>
			{/* Navy section (first score column) and Blue section (second score column) */}
			<SlideRight delay={0} finish={-200} hide={animationStep >= 1} start={0}>
				<path className="cls-2" d="M237 27h39v81h-39z" fill={colors.c4} id="tennis-blue-green-right-bg" />
				<path className="cls-3" d="M276 27h39v81h-39z" fill={colors.c3} id="tennis-blue-purple-right-bg" />
				<g id="tennis-blue-Sets">
					<text className="cls-7" fill={colors.c5} transform="translate(249 57.882)">
						{sets[0]}
					</text>
					<text className="cls-7" fill={colors.c5} transform="translate(249 98.882)">
						{sets[1]}
					</text>
				</g>
				<g id="tennis-blue-Legs">
					<text className="cls-7" fill={colors.c6} transform="translate(286.915 57.882)">
						{legs[0]}
					</text>
					<text className="cls-7" fill={colors.c6} transform="translate(286.915 98.882)">
						{legs[1]}
					</text>
				</g>
			</SlideRight>
			{/* Rightmost white section (third score column) - collapses into blue section on hide */}
			<SlideRight delay={300} finish={0} hide={isRightCollapsed} start={-39}>
				<path className="cls-1" d="M315 27h39v81h-39z" fill={colors.c1} id="tennis-blue-small-white-bg" />
				<g id="tennis-blue-AD">
					<text className="cls-4" fill={colors.c7} textAnchor="middle" transform="translate(334 57.882)">
						{tennisCurrentScore[0].toString()}
					</text>
					<text className="cls-4" fill={colors.c7} textAnchor="middle" transform="translate(334 98.882)">
						{tennisCurrentScore[1].toString()}
					</text>
				</g>
			</SlideRight>
			{/* Step 1: Background elements fade in first */}
			<g id="tennis-blue-backgrounds">
				<path className="cls-1" d="M11 27h226v81H11z" fill={colors.c1} id="tennis-blue-lg-white" />
				<path className="cls-2" d="M0 27h11v81H0z" fill={colors.c4} id="tennis-blue-green-left-bg" />
			</g>
			{/* Step 2: Team names  */}
			<g id="tennis-blue-Names">
				<text className="cls-4" fill={colors.c2} transform="translate(16.872 57.882)">
					{teamA.name}
				</text>
				<text className="cls-4" fill={colors.c2} transform="translate(15.872 98.882)">
					{teamB.name}
				</text>
			</g>
			{/* Step 4: Current score and server indicator */}
			<FadeIn delay={0} show={animationStep >= 2}>
				<g data-name="Layer 8" id="tennis-blue-Layer_8">
					{isFirstServer ? (
						<circle className="cls-3" cx={220} cy={49} fill={colors.c3} r={4} />
					) : (
						<circle className="cls-3" cx={220} cy={90} fill={colors.c3} r={4} />
					)}
				</g>
				<g id="tennis-blue-Line">
					<path
						d="M11 69h400"
						style={{
							opacity: 0.61,
							stroke: '#9e9e9e',
							strokeWidth: '.25px',
							fill: 'none',
							strokeMiterlimit: 10,
						}}
					/>
				</g>
			</FadeIn>
		</svg>
	);
}

// Export the component and types for external use
export type { TennisBlueScoreboardProps, Team, Colors };
export default TennisBlueScoreboardStandalone;
