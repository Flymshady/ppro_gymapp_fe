import React, {Component} from 'react';
import '../../styles/Table.css';

class CoursesDataTrainer extends Component {

    header = ["Název", "Od", "Do", "Počet konání", "Trenér", "Cena", "Kapacita"];

    renderTableHeader() {
        return this.header.map((h, i) => {
            return (
                <th key={i}>{h}</th>
            )
        })
    }

    renderTableDataCourses() {
        return this.props.courses.map((course, index) => {
            const { name, beginDate, endDate, count, trainer, price, maxCapacity } = course;
            return (
                <tr key={index}>
                    <td>{name}</td>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    <td>{count}</td>
                    <td>{trainer.firstName} {trainer.lastName}</td>
                    <td>{price}</td>
                    <td>{maxCapacity}</td>
                </tr>
            )
        })
    }

    renderTableDataCoursesTrainer() {
        return this.props.coursesTrainer.map((course, index) => {
            const { name, beginDate, endDate, count, trainer, price, maxCapacity } = course;
            return (
                <tr key={index}>
                    <td>{name}</td>
                    <td>{beginDate}</td>
                    <td>{endDate}</td>
                    <td>{count}</td>
                    <td>{trainer.firstName} {trainer.lastName}</td>
                    <td>{price}</td>
                    <td>{maxCapacity}</td>
                </tr>
            )
        })
    }

    render() {
        console.log("Data: " + this.props.courses);
        if (this.props.courses.length === 0) {
            return <p className="text-danger">Nejsou vypsané žádné kurzy</p>;
        } else {
            return (
                <div>
                    <h3>Vaše kurzy:</h3>
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableDataCoursesTrainer()}
                        </tbody>
                    </table>
                    <h3>Všechny kurzy:</h3>
                    <table id='tables'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableDataCourses()}
                        </tbody>
                    </table>
                </div>

            );
        }
    }
}

export default CoursesDataTrainer;
