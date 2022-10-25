import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AsistenciaPageModule } from '../asistencia/asistencia.module';
import { ProfesorPage } from '../profesor/profesor.page';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
   
  scanearQr : any;
  KEY_ASISTENCIA = 'asistencias';
  codAlumno : any;
  rut :any ;
  usuario = '';
  
  constructor(private activatedRoute: ActivatedRoute, private AsistenciaService: AsistenciaService,  private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = this.usuarioService.getUsuario(this.rut);
    
  }


/*   scanerQR(codQr){
    this.codAlumno = codQr
  }
   */

  async modificar(){
     await this.AsistenciaService.agregarqr(this.KEY_ASISTENCIA, this.codAlumno, this.usuario );
     alert('Clase iniciada');
  }
}