import React from 'react';

const DownArrow = () => {
	return <div style={{ display: "flex", alignItems: "center", padding: "6px 6px 0px 10px" }}>
		<svg
			style={{
				fill: "rgba(60,60,60,.5)",
				transform: "scale(1)",
				transition: "transform .15s cubic-bezier(1,-.115,.975,.855)",
				transitionTimingFunction: "cubic-bezier(1,-.115,.975,.855)"
			}}
			xmlns="http://www.w3.org/2000/svg" width="14" height="10" role="presentation"
		>
			<path
				d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z">
			</path>
		</svg>
	</div>
}

export default DownArrow;