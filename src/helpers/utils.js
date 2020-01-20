import React from "react";

export const percentDiff = (percent) => {
	if(percent > 0) {
		return {textClass: 'text-success', icon: 'uil uil-arrow-up', value: `${percent}%`}
	} else {
		return {textClass: 'text-danger', icon: 'uil uil-arrow-down', value: `${percent}%`}
	}
};
