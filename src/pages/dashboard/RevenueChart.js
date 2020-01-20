import React from 'react';
import Chart from 'react-apexcharts';
import {Card, CardBody} from 'reactstrap';

const RevenueChart = (props) => {
	let subsMembersData = props.subscribersData.map(item => (item.followers));
	let subsDate = props.subscribersData.map(item => (new Date(item.date).toLocaleString('ru-RU', {
		month: 'short',
		day: 'numeric'
	})));

	const apexLineChartWithLables = {
		chart: {
			height: 296,
			type: 'area',
        foreColors: ['red'],
			toolbar: {
				show: false,
			},
			parentHeightOffset: 0,
		},
		grid: {
			show: true,
			xaxis: {
				lines: {
					show: false
				}
			},
			yaxis: {
				lines: {
					show: false
				}
			},
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 2,
			colors: ['#4dc86f']
		},
		zoom: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		colors: ['#4dc86f'],
		xaxis: {
			type: 'string',
			categories: subsDate,
        tooltip: {
				enabled: false
			},
        axisBorder: {
				show: false
			},
    },
		yaxis: {
			labels: {
				formatter: function (val) {
					return val + ""
				}
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				type: "vertical",
				shadeIntensity: 1,
				inverseColors: false,
				opacityFrom: 0.45,
				opacityTo: 0.05,
				stops: [45, 100]
			},
		},
		tooltip: {
			theme: 'dark',
			x: {show: false}
		}
	};
	const apexLineChartWithLablesData = [{
		name: 'Подписчики',
		data: subsMembersData
	}];

	return (
		<Card className={"dashboard-two-row"}>
			<CardBody className="pb-0">
				<h5 className="card-title mb-0 header-title card-text">Подписчики</h5>
				<Chart
					options={apexLineChartWithLables}
					series={apexLineChartWithLablesData}
					type="area"
					className="apex-charts mt-3"
					height={296}
				/>
			</CardBody>
		</Card>
	);
};

export default RevenueChart;
