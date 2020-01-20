import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const SalesChart = (props) => {
    const ageLabels = props.ageData.value.map(item => (item));
    const ageData = props.ageData.count.map(item => (item));
    const options = {
        chart: {
            type: 'donut',
            toolbar: {
                show: false,
            },
            parentHeightOffset: 0,
        },
        colors: ["#746ef0", "#4dc86f", "#fb9f4b", "#87ceeb", "rgba(140, 27, 171, 0.8)", "#ea5455"],
        grid: {
            borderColor: '#f1f3fa',
            padding: {
                left: 0,
                right: 0,
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                },
                expandOnClick: false
            }
        },
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'left',
            itemMargin: {
                horizontal: 6,
                vertical: 3
            }
        },
        labels: ageLabels,
        responsive: [{
            breakpoint: 480,
            options: {
                
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            y: {
                formatter: function(value) { return value }
            },
        }
    };

    const data = ageData;

    return (
        <Card className={"dashboard-three-row"}>
            <CardBody className="">
                <h5 className="card-title mt-0 mb-0 header-title card-text">Возраст участников</h5>

                <Chart
                    options={options}
                    series={data}
                    type="donut"
                    className="apex-charts mb-0 mt-4"
                    height={270}
                />
            </CardBody>
        </Card>
    );
};

export default SalesChart;
