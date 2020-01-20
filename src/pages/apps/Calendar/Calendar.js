// @flow
import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import PageTitle from '../../../components/PageTitle';
import ruLocale from '@fullcalendar/core/locales/ru';

import AddNewEvent from './AddNewEvent';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateClick = this.handleDateClick.bind(this);
  };

  handleDateClick = (arg) => {
    this.props.addEventModalOpen(true);
    this.props.addDataDateClick({date: arg.date});
  };

  render() {
    return (
      <React.Fragment>
        <Row className="page-title">
          <Col className="col-12">
            <PageTitle
              breadCrumbItems={[
                { label: 'Calendar', path: '/apps/calendar', active: true },
              ]}
              title={'Calendar'}
            />
          </Col>
        </Row>
        <Row>
          <AddNewEvent />
          <Col className="col-12">
            <Card>
              <CardBody>
                <FullCalendar
                  /*dateClick={this.handleDateClick}*/
                  customButtons={{
                    myCustomButton: {
                      text: 'Добавить событие',
                      click: () => {
                        this.props.addEventModalOpen(true);
                        this.props.addDataDateClick({});
                      },
                      icon: 'uil-plus-circle',
                      buttonIcons: 'uil-plus-circle',
                    },
                  }}
                  locale="ruLocale"
                  defaultView="dayGridMonth"
                  plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                  slotDuration='00:15:00'
                  minTime='08:00:00' maxTime='19:00:00' themeSystem='bootstrap'
                  handleWindowResize={true}
                  bootstrapFontAwesome={false}
                  buttonText={{today: 'Сегодня', month: 'Месяц', week: 'Неделя', day: 'День', list: 'Список', prev: 'Назад', next: 'Вперед' }}
                  header={{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                  }}
                  color={'yellow'}
                  textColor={'black'} // an option!
                  eventLimit={true}
                  selectable={true}
                  events={this.props.events}
                  id="calendar"
                  droppable={false}
                  timeFormat={{
                    agenda: 'H(:mm)'
                  }}
                  eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12:false
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Calendar;
