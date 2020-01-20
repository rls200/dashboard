import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const TargetChart = (props) => {
    const invData = props.involvementData.indicators.involvement;
    const options= {
        options: {
            chart: {
                height: '100%',
                type: 'area',
                toolbar: {
                    show: false,
                },
                sparkline: {
                    enabled: true
                },
                parentHeightOffset: 0,
            },
            colors: ["#f6131d"],
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: '20px',
                            color: undefined,
                            offsetY: 120
                        },
                        value: {
                            fontSize: '30px',
                            color: undefined,
                            formatter: function (val) {
                                return val + "%";
                            }
                        }
                    },
                    track: {
                        show: true,
                        background: '#2a2c49',
                    },

                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#7f60c7'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                },
            },
            stroke: {
                dashArray: 5,
                colors: ["#2a2c49"],
                color: "#2a2c49",
            },
            labels: ['']
        },
    };

    return (
        <Card className={"dashboard-two-row"}>
            <CardBody className="pb-0" style={{height: '391px'}}>
                <h5 className="card-title header-title card-text">Вовлеченность</h5>
                <Chart
                  options={options.options}
                  series={[invData]}
                  type="radialBar"
                  className="apex-charts mt-3"
                />
            </CardBody>
        </Card>
    );
};

export default TargetChart;
