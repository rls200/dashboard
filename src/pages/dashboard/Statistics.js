// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';
import {percentDiff} from '../../helpers/utils';

const Statistics = (props) => {
  let indicatorsData = props.indicatorsData;
  let graphDataLikes = {
    indicatorsLikes: indicatorsData.indicators.indicators.likes,
    indicatorDayLikes: indicatorsData.data.map(item => (item.likes)),
    percentLikes: percentDiff(indicatorsData.indicators.percent.likes)
  };
  let graphDataReposts = {
    indicatorsReposts: indicatorsData.indicators.indicators.reposts,
    indicatorDayReposts: indicatorsData.data.map(item => (item.reposts)),
    percentReposts: percentDiff(indicatorsData.indicators.percent.reposts)
  };
  let graphDataСomments = {
    indicatorsСomments: indicatorsData.indicators.indicators.comments,
    indicatorDayСomments: indicatorsData.data.map(item => (item.comments)),
    percentСomments: percentDiff(indicatorsData.indicators.percent.comments)
  };
  let graphDataViews = {
    indicatorsViews: indicatorsData.indicators.indicators.views,
    indicatorDayViews: indicatorsData.data.map(item => (item.views)),
    percentViews: percentDiff(indicatorsData.indicators.percent.views)
  };

  return (
      <React.Fragment>
          <Row>
              <Col md={6} xl={3}>
                  <StatisticsChartWidget
                      description="Нравится"
                      title={graphDataLikes.indicatorsLikes}
                      data={graphDataLikes.indicatorDayLikes}
                      trend={graphDataLikes.percentLikes}>
                  </StatisticsChartWidget>
              </Col>

              <Col md={6} xl={3}>
                <StatisticsChartWidget
                  description="Репосты"
                  colors={['#f77e53']}
                  title={graphDataReposts.indicatorsReposts}
                  data={graphDataReposts.indicatorDayReposts}
                  trend={graphDataReposts.percentReposts}>
                </StatisticsChartWidget>
              </Col>

              <Col md={6} xl={3}>
                <StatisticsChartWidget
                  description="Комментарии"
                  colors={['#43d39e']}
                  title={graphDataСomments.indicatorsСomments}
                  data={graphDataСomments.indicatorDayСomments}
                  trend={graphDataСomments.percentСomments}>
                </StatisticsChartWidget>
              </Col>

              <Col md={6} xl={3}>
                <StatisticsChartWidget
                  description="Просмотры"
                  colors={['#ffbe0b']}
                  title={graphDataViews.indicatorsViews}
                  data={graphDataViews.indicatorDayViews}
                  trend={graphDataViews.percentViews}>
                </StatisticsChartWidget>
              </Col>
          </Row>
      </React.Fragment>
  );
};

export default Statistics;
