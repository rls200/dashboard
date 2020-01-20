import {Card, CardBody, Table} from "reactstrap";
import React from "react";

const ResponsiveTable = (props) => {
	const cityData = props.cityData;
	let records = [];

	for (let i = 0; i < cityData.value.length; i++) {
		records.push({ name: cityData.value[i], count: cityData.count[i] })
	}

	return (
		<Card className={"dashboard-three-row"}>
			<CardBody>
				<h4 className="header-title mt-0 mb-1 mb-3 card-text vx-border-bottom pb-2">{props.title}</h4>

				<Table className="mb-0" responsive>
					<tbody>
					{records.map((record, index) => {
						return (
							<tr key={index}>
								<td className={'text-left border-top-0 p-2 card-text'}>{record.name}</td>
								<td className={'text-right border-top-0 p-2 card-text'}>{record.count + ' чел.'}</td>
							</tr>
						);
					})}
					</tbody>
				</Table>
			</CardBody>
		</Card>
	);
};

export default ResponsiveTable;