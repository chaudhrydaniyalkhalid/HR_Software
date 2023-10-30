import React, { useState, useRef } from "react";
import { useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Card, Container, Form, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import "../../Leaves/leaves.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import HeaderContext from '../../../Context/HeaderContext'

function LeaveAllocation() {
    const [leaves, setLeaves] = useState([]);
    const [leaveType, setLeaveType] = useState("");
    const [allocatedOnce, setAllocatedOnce] = useState(false);
    const [company, setCompany] = useState([]);
    const [department, setDepartment] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [childModel, setShowChildModel] = useState(false);
    const [testUpdate, setTestUpdate] = useState(false);
    const [allocationDetail, setAllocationDetail] = useState([]);
    const [addAllocation, setAddAllocation] = useState({
        company: {},
        department: {},
        designation: {},
        allocation: 0, 
    });
    const Closechildmodal = () => setShowChildModel(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleAllocationdetails = (e) => {
        const { name, value } = e.target;
        const [id, title] = value.split('|');

        setAddAllocation((prevState) => ({
            ...prevState,
            [name]: {
                id,
                title,
            },
        }));

    };

    const removeitem = (i) => {
        const temp = allocationDetail;
        temp.splice(i, 1);
        setAllocationDetail(temp);
        setTestUpdate(!testUpdate);
    };

    const a = useContext(HeaderContext)
    useEffect(() => {
        a.update("Human Resource / Leave Allocation")
    })


    const handleCheckboxChange = (event) => {
        setAllocatedOnce(event.target.checked);
    };

    const addAllocationDetails = async (event) => {
        const allocations = []
        if (allocationDetail[0] && allocationDetail[0].company && allocationDetail[0].department && allocationDetail[0].designation && allocationDetail[0].allocation) {
            allocations.push({
                company: allocationDetail[0].company.id,
                department: allocationDetail[0].department.id,
                designation: allocationDetail[0].designation.id,
                allocation: allocationDetail[0].allocation.id,
                allocatedOnce:allocatedOnce
            });
        }
        if (allocationDetail[1] && allocationDetail[1].company && allocationDetail[1].department && allocationDetail[1].designation && allocationDetail[1].allocation) {
            allocations.push({
                company: allocationDetail[1].company.id,
                department: allocationDetail[1].department.id,
                designation: allocationDetail[1].designation.id,
                allocation: allocationDetail[1].allocation.id,
                allocatedOnce:allocatedOnce
            });
        }
        if (allocationDetail[2] && allocationDetail[2].company && allocationDetail[2].department && allocationDetail[2].designation && allocationDetail[2].allocation) {
            allocations.push({
                company: allocationDetail[2].company.id,
                department: allocationDetail[2].department.id,
                designation: allocationDetail[2].designation.id,
                allocation: allocationDetail[2].allocation.id,
                allocatedOnce:allocatedOnce
            });
        }
        if (allocationDetail[3] && allocationDetail[3].company && allocationDetail[3].department && allocationDetail[3].designation && allocationDetail[3].allocation) {
            allocations.push({
                company: allocationDetail[3].company.id,
                department: allocationDetail[3].department.id,
                designation: allocationDetail[3].designation.id,
                allocation: allocationDetail[3].allocation.id,
                allocatedOnce:allocatedOnce
            });
        }
        event.preventDefault();
        try {
            const addreq = await axios.put(process.env.React_APP_ORIGIN_URL + `leaves/addleaves/${leaveType}`, {
                allocations
            })
            addreq && NotificationManager.success("Successfully Added");
        } catch (error) {
            NotificationManager.error("Failed to Add");
        }
    };


    const fetchData = async () => {
        try {
            const res = await axios.get(process.env.React_APP_ORIGIN_URL + "leaves");
            const dd = res.data.getLeave;
            setLeaves(dd);
        } catch (error) {
            console.log(error);
        }
    };
    const companies = async () => {
        try {
            const companies = await axios.get(process.env.React_APP_ORIGIN_URL + "allCompany");
            const res = companies.data;
            setCompany(res);
        } catch (error) {
            console.log(error);
        }
    };
    const departments = async () => {
        try {
            const dep = await axios.get(process.env.React_APP_ORIGIN_URL + "departments");
            const res = dep.data;
            setDepartment(res.departments);
        } catch (error) {
            console.log(error);
        }
    };
    const Designation = async () => {
        try {
            const des = await axios.get(process.env.React_APP_ORIGIN_URL + "designation");
            const res = des.data
            setDesignation(res.designation);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
        Designation();
        departments();
        companies();
    }, []);

    return (
        <>
            <div
                className="content-wrapper my-1"
                style={{ backgroundColor: "#f7f7f7" }}
            >
                <section className="content" style={{ marginTop: "30px" }}>
                    <div className="container">
                        <div className="card">
                            <div className="card-header buttoncolor ">
                                <h3 className="card-title" style={{ color: "white" }}>
                                    Leave Allocation
                                </h3>
                            </div>
                            <div className="card-body">
                                <Container>
                                    <div>
                                        <Row>
                                            <Col >
                                                <Card>
                                                    <Card.Body>
                                                        <Container>
                                                            <Form onSubmit={addAllocationDetails}>
                                                                <Row>
                                                                    <Col>
                                                                        <Form.Group
                                                                            className="mb-3"
                                                                            controlId="formBasicEmail"
                                                                        >
                                                                            <Form.Label className="fieldLabel font-weight-normal">Leave type</Form.Label>
                                                                            <Form.Select
                                                                                required
                                                                                name="leaveType"
                                                                                value={leaveType.id}
                                                                                onChange={(e) => {
                                                                                    setLeaveType(e.target.value);
                                                                                }}
                                                                                style={{ padding: "3px 3px" }}
                                                                            >
                                                                                <option disabled selected hidden value="">Please Select</option>
                                                                                {leaves.map((d) => {
                                                                                    return (
                                                                                        <option
                                                                                            key={d._id}
                                                                                            value={d._id}
                                                                                            name={d.leaveType}
                                                                                        >
                                                                                            {d.leaveType}
                                                                                        </option>
                                                                                    );
                                                                                })}
                                                                            </Form.Select>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="fieldLabel font-weight-normal">Allocated once</Form.Label><br></br>
                                                                        <Checkbox name="allocatedOnce"
                                                                            checked={allocatedOnce}
                                                                            onChange={handleCheckboxChange} {...label} />
                                                                    </Col>
                                                                </Row>
                                                                <br />
                                                                <br />
                                                                <div style={{ display: "flex", justifyContent: "space-between", marginRight: 10 }}>
                                                                    <h5> Leave Allocation</h5>
                                                                    <a
                                                                        className="btn buttoncolor  "
                                                                        onClick={() => {
                                                                            setShowChildModel(true);
                                                                        }}
                                                                        style={{ backgroundColor: "rgb(137, 179, 83)", fontSize: "small" }}
                                                                    >
                                                                        Add
                                                                    </a>
                                                                </div>
                                                                <Row style={{ marginTop: "1%" }}>
                                                                    <Col lg={12}>
                                                                        <Table striped bordered hover>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>#</th>
                                                                                    <th style={{ textAlign: "center" }}>Company</th>
                                                                                    <th style={{ textAlign: "center" }}>Department</th>
                                                                                    <th style={{ textAlign: "center" }}>Designation</th>
                                                                                    <th style={{ textAlign: "center" }}>Allocation</th>
                                                                                    <th style={{ textAlign: "center" }}>Remove</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {allocationDetail.length > 0 &&
                                                                                    allocationDetail.map((d, i) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <th>{i + 1}</th>
                                                                                                <td>{d.company.title}</td>
                                                                                                <td>{d.departments.title}</td>
                                                                                                <td>{d.designation.title}</td>
                                                                                                <td>{d.allocation.id}</td>
                                                                                                <td>
                                                                                                    <i
                                                                                                        class="fa fa-trash-can"
                                                                                                        aria-hidden="true"
                                                                                                        style={{ color: "red" }}
                                                                                                        onClick={() => removeitem(i)}
                                                                                                    ></i>
                                                                                                </td>
                                                                                            </tr>
                                                                                        );
                                                                                    })}
                                                                            </tbody>
                                                                        </Table>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                                                            <Button variant="primary" type="submit" className="submitButton" style={{ backgroundColor: "rgb(137, 179, 83)", marginLeft: "auto" }}>
                                                                                Submit
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        </Container>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* ///allocation leaves modal  */}
                                    <Modal
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        show={childModel}
                                        onHide={Closechildmodal}
                                        size="lg"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title
                                                id="contained-modal-title-vcenter "
                                                style={{ textAlign: "center" }}
                                            >
                                                <h5>Add Leave Allocation</h5>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Container fluid>
                                                <Row className="mb-3">
                                                    <Col>
                                                        <Form.Group
                                                            as={Col}
                                                            controlId="formGridLastName"
                                                            className="formmargin"
                                                        >
                                                            <Form.Label>Company</Form.Label>
                                                            <Form.Select
                                                                name="company"
                                                                Value={addAllocation.company}
                                                                onChange={handleAllocationdetails}
                                                            >
                                                                <option disabled selected hidden defaultValue={""}>Please Company...</option>
                                                                {company && company.map((d) => {
                                                                    const combinedValue = `${d._id}|${d.title}`;
                                                                    return (
                                                                        <option
                                                                            key={d._id}
                                                                            value={combinedValue}
                                                                        >
                                                                            {d.title}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group
                                                            as={Col}
                                                            controlId="formGridLastName"
                                                            className="formmargin"
                                                        >
                                                            <Form.Label>Department</Form.Label>
                                                            <Form.Select name="departments"
                                                                Value={addAllocation.department}
                                                                onChange={handleAllocationdetails}
                                                            >
                                                                <option disabled selected defaultValue={""}>
                                                                    Select department..
                                                                </option>
                                                                {department && department.map((d, i) => {
                                                                    const combinedValue = `${d._id}|${d.departmentname}`;
                                                                    return (
                                                                        <>
                                                                            <option key={d._id}
                                                                                value={combinedValue}
                                                                            >
                                                                                {d.departmentname}
                                                                            </option>
                                                                        </>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Group
                                                            as={Col}
                                                            controlId="formGridLastName"
                                                            className="formmargin"
                                                        >
                                                            <Form.Label>Designation</Form.Label>
                                                            <Form.Select
                                                                name="designation"
                                                                value={addAllocation.designation && addAllocation.designation.title}
                                                                onChange={handleAllocationdetails}
                                                            >
                                                                <option disabled selected defaultValue={""}>
                                                                    Select designation..
                                                                </option>
                                                                {designation && designation.map((d) => {
                                                                    const combinedValue = `${d._id}|${d.title}`;
                                                                    return (
                                                                        <option
                                                                            key={d._id}
                                                                            value={combinedValue}
                                                                        >
                                                                            {d.title}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Label>Leave Allocation</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="allocation"
                                                            required
                                                            onChange={handleAllocationdetails}
                                                        ></Form.Control>
                                                    </Col>
                                                </Row>
                                                <div className="d-flex justify-content-center my-3">
                                                    <Button
                                                        onClick={() => {
                                                            allocationDetail.push(addAllocation)
                                                            setAllocationDetail(allocationDetail)
                                                            Closechildmodal();
                                                            console.log("detail", allocationDetail)
                                                            setAddAllocation({})
                                                        }}
                                                        style={{ backgroundColor: "rgb(137, 179, 83)" }}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </Container>
                                        </Modal.Body>
                                    </Modal>
                                </Container>
                            </div>
                        </div>
                    </div>
                </section>
                <NotificationContainer />
            </div>
        </>
    )
}

export default LeaveAllocation