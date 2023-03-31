import React from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Table } from "../table";
import { Body, H4, P } from "../typography";
import { Info } from "react-feather";
import { Link } from 'react-router-dom';
// import { COLORS } from "src/assets/styles/theme";
import { Dropdown, Tab, Nav } from 'react-bootstrap';
import OrderTab from '../Future/OrderTab';
import TradeTab from '../Future/TradeTab';
import { useEffect, useState, useRef } from 'react';
import Toltip from "../buttons/toltip";
// import { FiAlertCircle } from "react-icons/fi";

const orderTable = [
	{ email: 'samantha@mail.com', title: 'Samanta William', price: '$75,00', status: 'Paid', statusChange: 'success' },
	{ email: 'tony@gmail.com', title: 'Tony Soap', price: '$80,00', status: 'Unpaid', statusChange: 'danger' },
	{ email: 'demo@mail.com', title: 'Nela Vita', price: '$90,00', status: 'Paid', statusChange: 'success' },
	{ email: 'karen@mail.com', title: 'Karen Hope', price: '$70,00', status: 'Pending', statusChange: 'warning' },
	{ email: 'nadia@mail.com', title: 'Nadia Edja', price: '$76,00', status: 'Unpaid', statusChange: 'danger' },
	{ email: 'samantha@mail.com', title: 'Samanta William', price: '$75,00', status: 'Paid', statusChange: 'success' },
	{ email: 'tony@gmail.com', title: 'Tony Soap', price: '$80,00', status: 'Unpaid', statusChange: 'danger' },
	{ email: 'demo@mail.com', title: 'Nela Vita', price: '$90,00', status: 'Paid', statusChange: 'success' },
	{ email: 'karen@mail.com', title: 'Karen Hope', price: '$70,00', status: 'Pending', statusChange: 'warning' },
	{ email: 'nadia@mail.com', title: 'Nadia Edja', price: '$76,00', status: 'Unpaid', statusChange: 'danger' },
];

const tabDataBlog = [
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$20000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$21000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$23000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$27000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$13000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },
	{ Date: 'ETH', Trade: '$152.7', Status: '$605.2', Price: '$16000', Amount: '57.6%' },

];
export const Collateral = () => {
	const [visible, setvisible] = useState(false);
	const [data, setData] = useState(
		document.querySelectorAll("#status_wrapper tbody tr")
	);
	const sort = 6;
	const activePag = useRef(0);
	const [test, settest] = useState(0);

	// Active data
	const chageData = (frist, sec) => {
		for (var i = 0; i < data.length; ++i) {
			if (i >= frist && i < sec) {
				data[i].classList.remove("d-none");
			} else {
				data[i].classList.add("d-none");
			}
		}
	};
	// use effect
	useEffect(() => {
		setData(document.querySelectorAll("#status_wrapper tbody tr"));
		//chackboxFun();
	}, [test]);


	// Active pagginarion
	activePag.current === 0 && chageData(0, sort);
	// paggination
	let paggination = Array(Math.ceil(data.length / sort))
		.fill()
		.map((_, i) => i + 1);

	// Active paggination & chage data
	const onClick = (i) => {
		activePag.current = i;
		chageData(activePag.current * sort, (activePag.current + 1) * sort);
		settest(i);
	};

	const checkboxFun = (type) => {
		setTimeout(() => {
			const checkbox = document.querySelectorAll('.order-history input');
			const motherCheckBox = document.querySelector('.sorting_asc input');
			for (let i = 0; i < checkbox.length; i++) {
				const element = checkbox[i]
				if (type === 'all') {
					if (motherCheckBox.checked) {
						element.checked = true
					} else {
						element.checked = false
					}
				} else {
					if (!element.checked) {
						motherCheckBox.checked = false
						break
					} else {
						motherCheckBox.checked = true
					}
				}
			}
		}, 200);
	}

	return (
		// <div className="row w-100" style={{ borderRadius: "16px" }}>
		// 	<div className="col-md-8 p-0">
		// 		<div
		// 			className="w-100 d-flex flex-column align-items-center"
		// 			style={{
		// 				backgroundColor: "#262522",
		// 				borderTopLeftRadius: "16px",
		// 				borderBottomLeftRadius: "16px",
		// 			}}
		// 		>
		// 			<div className="mt-3"></div>
		// 			<H4>Select a collateral type</H4>
		// 			<P>Each Collateral type has its own risk parameters.</P>

		// 			<Table
		// 				actions={[]}
		// 				selection={true}
		// 				borderBottom={true}
		// 				className="w-100"
		// 				headings={[
		// 					"Collateral",
		// 					"Stability Fee",
		// 					"LIQ Ratio",
		// 					"LIQ Fee",
		// 					"Your Balance",
		// 				]}
		// 				data={[
		// 					[
		// 						{ data: "ETH-A" },
		// 						{ data: "0.75 %" },
		// 						{ data: "150.00 %" },
		// 						{ data: "0.00 %" },
		// 						{ data: "0.00223001" },
		// 					],
		// 					[
		// 						{ data: "BAT-A" },
		// 						{ data: "0.50 %" },
		// 						{ data: "120.00 %" },
		// 						{ data: "0.00 %" },
		// 						{ data: "0.00223001" },
		// 					],
		// 					[
		// 						{ data: "ETH" },
		// 						{ data: "1.00 %" },
		// 						{ data: "120.00 %" },
		// 						{ data: "0.00 %" },
		// 						{ data: "0.00223001" },
		// 					],
		// 					[
		// 						{ data: "USDC-A" },
		// 						{ data: "3.00 %" },
		// 						{ data: "150.00 %" },
		// 						{ data: "0.00 %" },
		// 						{ data: "0.00223001" },
		// 					],
		// 					[
		// 						{ data: "WBTC-A" },
		// 						{ data: "0.75 %" },
		// 						{ data: "120.00 %" },
		// 						{ data: "0.00 %" },
		// 						{ data: "0.00223001" },
		// 					],
		// 					[
		// 						{ data: "TUSD-A" },
		// 						{ data: "1.00 %" },
		// 						{ data: "150.00 %" },
		// 						{ data: "0.00 %" },
		// 						{ data: "0.00223001" },
		// 					],
		// 				]}
		// 			/>
		// 			<div className="mt-3"></div>
		// 			<div className="w-100 d-flex flex-row justify-content-start p-3">
		// 				{/* Form Actions */}
		// 				<FormActionButton color="white" outline={true}>
		// 					Cancel
		// 				</FormActionButton>
		// 				<FormActionButton
		// 					color="primary"
		// 					gradient={true}
		// 					outline={true}
		// 					className="mx-2"
		// 				>
		// 					Continue
		// 				</FormActionButton>
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div
		// 		className="col-md-4 p-0"
		// 		style={{
		// 			backgroundColor: "#262522",
		// 			borderTopRightRadius: "16px",
		// 			borderBottomRightRadius: "16px",
		// 			borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
		// 			position: "relative",
		// 		}}
		// 	>
		// 		{/* <div className="pt-5"> */}
		// 			<div style={{ position: "absolute", right: 30, top: 30 }}>
		// 				{/* <Info color={COLORS.white} /> */}
		// 				<Info/>
		// 			</div>
		// 			{/* <div className="p-3">
		// 				<Body className="mt-5" style={{ fontWeight: "600" }}>
		// 					Stability Fee
		// 				</Body>
		// 				<Body style={{ fontWeight: "300" }}>
		// 					The fee calculated based on the outstanding debt of your position.
		// 					This is continiously added to your existing debt.
		// 				</Body>
		// 				<Body className="mt-3" style={{ fontWeight: "600" }}>
		// 					Liquidation Ratio
		// 				</Body>
		// 				<Body style={{ fontWeight: "300" }}>
		// 					The collateral-to-dai ratio at which the position becomes
		// 					vulnerable to liquidation.
		// 				</Body>
		// 				<Body className="mt-3" style={{ fontWeight: "600" }}>
		// 					Liquidation Fee
		// 				</Body>
		// 				<Body style={{ fontWeight: "300" }}>
		// 					The fee that is added to the total outstanding DAI debt when a
		// 					liquidation occurs.
		// 				</Body>
		// 			</div> */}
		// 		{/* </div> */}
		// 	</div>
		// </div>
		<>
			<div className="row mt-5">
				<div className="col-xl-12">
					<div className="card" style={{
						backgroundColor: "#211f21",
						borderRadius: "16px",
						color: "#846424",
					}}>
						<div className="card-body">
							<Tab.Container defaultActiveKey="All">
								<div className="card-header border-0 pb-2 flex-wrap">
									<h4 className="heading ">Select a collateral type</h4>
									<a className="text-white">Each Collateral type has its own risk parameters.</a>
									{/* <div 
									onMouseEnter={()=>setvisible(true)}
									onMouseLeave = {()=>setvisible(false)}
									style={{ position: "absolute", right: 30, top: 30 }}>
										<Info text = {"Something"}/>
									</div> */}
									<div style={{ position: "absolute", right: 30, top: 30 }}>
										<Toltip style={{ position: "absolute", right: 30, top: 30 }}>
											<Info />
										</Toltip>
									</div>
									{/* <>
									<Nav className="order nav nav-tabs">
										<Nav.Link as="button" eventKey="All" type="button">Order</Nav.Link>
										<Nav.Link as="button" eventKey="Order" type="button">Order History</Nav.Link>
										<Nav.Link as="button" eventKey="Trade" type="button">Trade Histroy</Nav.Link>
									</Nav>
								</> */}
								</div>
								<div className="card-body pt-0 pb-0">
									<Tab.Content >
										<Tab.Pane eventKey="All">
											<div className="table-responsive dataTabletrade ">
												<div id="status_wrapper" className="dataTables_wrapper no-footer">
													<table id="example" className="table display dataTable no-footer" style={{ minWidth: "845px" }}>
														<thead>
															<tr
																style={{
																	color: "#846424",
																}}>
																{/* <th className="sorting_asc">
																	<input type="checkbox" className="form-check-input" id="checkAll" required=""
																		onClick={() => checkboxFun('all')}
																	/>
																</th> */}
																<th></th>
																<th>Collateral</th>
																<th>Stability Fee</th>
																<th>LIQ Ratio</th>
																<th>LIQ Fee</th>
																<th>Your Balance</th>
																{/* <th>Reward</th> */}
																<th className="text-end">Action</th>
															</tr>
														</thead>
														<tbody className='text-white'>
															{tabDataBlog.map((item, index) => (
																<tr key={index}>
																	<td>
																		<div className="checkbox me-0 align-self-center">
																			<div className="custom-control custom-checkbox ">
																				<input type="checkbox" className="form-check-input" id={`checkbox${index + 1}`} required=""
																					style={{
																						backgroundColor: "#757375"
																					}}
																					onClick={() => checkboxFun()}
																				/>
																				<label className="custom-control-label" htmlFor={`checkbox${index + 1}`}></label>
																			</div>
																		</div>
																	</td>
																	<td>{item.Date}</td>
																	<td>{item.Trade}</td>
																	<td>{item.Status}</td>
																	<td>{item.Price}</td>
																	<td>{item.Amount}</td>
																	{/* <td className="text-end">--</td> */}
																	<td>
																		<span class="badge cursor-pointer"
																			style={{
																				height: "22px",
																				width: "80px",
																				color: "black",
																				textTransform: "uppercase",
																				fontStyle: "normal",
																				fontWeight: "700",
																				fontSize: "10px",
																				background: "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
																				borderRadius: "40px",
																			}}>Deposite</span>																</td>
																	<td>
																		<span class="badge cursor-pointer"
																			style={{
																				color: "black",
																				fontStyle: "normal",
																				height: "22px",
																				width: "80px",
																				fontWeight: "700",
																				fontSize: "10px",
																				textTransform: "uppercase",
																				background: "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
																				borderRadius: "40px",
																			}}>Deposite</span>
																	</td>
																</tr>
															))}
														</tbody>
													</table>
													<div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
														<div className="dataTables_info">
															Showing {activePag.current * sort + 1} to{" "}
															{data.length > (activePag.current + 1) * sort
																? (activePag.current + 1) * sort
																: data.length}{" "}
															of {data.length} entries
														</div>
														<div
															className="dataTables_paginate paging_simple_numbers mb-0"
															id="application-tbl1_paginate"
														>
															<Link
																className="paginate_button previous text-white"
																style={{
																	backgroundColor: "#757375",
																	borderRadius: "16px",
																}}
																// to="/future"
																onClick={() =>
																	activePag.current > 0 &&
																	onClick(activePag.current - 1)
																}
															>
																<i className="fa fa-angle-double-left" ></i>
															</Link>
															<span className='text-white'>
																{paggination.map((number, i) => (
																	<Link
																		key={i}
																		// to="/future"
																		className={`paginate_button  ${activePag.current === i ? "current" : ""
																			} `}
																		onClick={() => onClick(i)}
																	>
																		{number}
																	</Link>
																))}
															</span>

															<Link
																style={{
																	backgroundColor: "#757375",
																	borderRadius: "16px",
																}}
																className="paginate_button next text-white"
																// to="/future"
																onClick={() =>
																	activePag.current + 1 < paggination.length &&
																	onClick(activePag.current + 1)
																}
															>
																<i className="fa fa-angle-double-right" ></i>
															</Link>
														</div>
													</div>
												</div>
											</div>
										</Tab.Pane>
										<Tab.Pane eventKey="Order">
											<OrderTab />
										</Tab.Pane>
										<Tab.Pane eventKey="Trade">
											<TradeTab />
										</Tab.Pane>
									</Tab.Content>
								</div>
							</Tab.Container>
						</div>
						<div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}></div>
						<div className="mt-4"></div>
						<div className="w-100 d-flex flex-row justify-content-start p-3">
							{/* Form Actions */}
							<FormActionButton color="white" outline={true}>
								Back
							</FormActionButton>
							<FormActionButton
								color="primary"
								gradient={true}
								outline={true}
								className="mx-2"
							>
								Open Position
							</FormActionButton>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};
