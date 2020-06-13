import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Employee } from '../Employee';
import * as jsPDF from 'jspdf'


@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	//styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
	title = 'charts';
	url = 'http://localhost:4000/view';
	employees: Employee[];
	employee_name = [];
	employee_id = 0;
	lnd = [];
	pnd = [];
	eod = [];
	tc = [];
	rt = [];
	ov = [];
	chart = [];

	constructor(private httpClient: HttpClient, private route: ActivatedRoute,
		private router: Router) { }

	generatePDF() {

		var canvas = document.querySelector('canvas') as HTMLCanvasElement;
		//creates image
		var canvasImg = canvas.toDataURL("image/png", 1.0);

		//creates PDF from img
		var doc = new jsPDF();

		doc.setFontSize(20);
		doc.text(85, 15, "ABC Pvt. Ltd.");
		doc.setFontSize(15);
		doc.text(75, 35, "Employee Appraisal Report");
		doc.setFontSize(10);
		doc.text(15, 55, "Employee ID: " + this.employee_id);
		doc.text(15, 60, "Employee Name: " + this.employee_name)
		doc.addImage(canvasImg, 'PNG', 40, 75, 120, 170);

		var remark = "";
		var hike = 0;

		if(this.ov[0] < 5)
			remark = "Unsatisfactory!"
		else if(this.ov[0] < 7){
			remark = "Satisfactory!"
			hike = 3}
		else if(this.ov[0] < 8){
			remark = "Good!"
			hike = 5}
		else if(this.ov[0] < 9){
			remark = "Very good!"
			hike = 7}
		else if(this.ov[0] < 10){
			remark = "Outstanding!"
			hike = 10}

		doc.text(15, 255, "The employee appraisal for the year 2019-20 is completed.");
		doc.text(15, 260, "Based on the management's feedback your performance is " + remark);
		doc.text(15, 265, `You are eligible for a ${hike}% performanace linked benefit.`);
		doc.save('Employee Performance Report.pdf');
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.employee_id = Number.parseInt(params['id']);
		 });

		this.httpClient.get(this.url).subscribe((res: Employee[]) => {
			res = res.filter((x) => x.employee_id == this.employee_id)
			console.log(res);
			res.forEach(y => {
				this.employee_name.push(y.employee_name);
				this.lnd.push(y.lnd);
				this.pnd.push(y.pnd);
				this.eod.push(y.eod);
				this.tc.push(y.tc);
				this.rt.push(y.rt);
				this.ov.push(y.ov);
			});

			var pndData = {
				label: 'Punctuality and Discipline',
				data: this.pnd,
				backgroundColor: 'rgba(0, 99, 132, 0.7)',
				borderWidth: 0,
				yAxisID: "y-axis-pnd"
			};

			var lndData = {
				label: 'Learning and Development skills',
				data: this.lnd,
				backgroundColor: 'rgba(255,183,71,0.7)',
				borderWidth: 0
			};

			var eodData = {
				label: 'Efficiency in execution',
				data: this.eod,
				backgroundColor: 'rgba(153,255,102,0.7)',
				borderWidth: 0
			};

			var tcData = {
				label: 'Teamplayer ',
				data: this.tc,
				backgroundColor: 'rgba(102,0,0,0.7)',
				borderWidth: 0
			};

			var rtData = {
				label: 'Leadership skills',
				data: this.rt,
				backgroundColor: 'rgba(255,110,113,0.7)',
				borderWidth: 0
			};

			var employeeData = {
				labels: this.employee_name,
				datasets: [lndData, pndData, eodData, tcData, rtData]
			};

			var chartOptions = {
				scales: {
					xAxes: [{
						barPercentage: 1,
						categoryPercentage: 0.4
					}],
					yAxes: [{
						id: "y-axis-pnd",
						ticks: {
							beginAtZero: true,
							min: 0,
							max: 10
						}
					}]
				},
				responsive: true,
				maintainAspectRatio: false
			};

			this.chart = new Chart('canvas', {
				type: 'bar',
				data: employeeData,
				options: chartOptions
			});

		});
	}
}
