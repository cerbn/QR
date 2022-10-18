import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AsistenciaPageModule } from '../asistencia/asistencia.module';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
   
  scanearQr : any;

  constructor(private AsistenciaService: AsistenciaService) { }

  ngOnInit() {
  }

  

  scanerQr(scanearQr){
    this.scanearQr = scanearQr
    this.scanearQr.AsistenciaService.asistencia.push
  }; 
}
