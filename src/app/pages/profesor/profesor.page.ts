import { Component, OnInit } from '@angular/core';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  profesor : any;
  asignaturas : any;
  elementType = 'canvas';
  value  = ''
  rut :any ;
  usuario = '';
  a ;
  
  asistencias: any[] = [];
  KEY_ASISTENCIA = 'asistencias';
  asistencia = {
    cod_asistencia: this.value,
    fecha_hora: new Date(),
    alumno: [],

  };





  constructor(private activatedRoute: ActivatedRoute, private router: Router, private asignaturaStorage: AsignaturasService, private usuarioService : UsuarioService,
              private asistenciaStorage: AsistenciaService) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.asignaturas = await this.asignaturaStorage.getDatos('asignaturas')
    this.usuario = this.usuarioService.getUsuario(this.rut);
    console.table(this.usuario);
    await this.cargarDatos();
    
    
  }
  
  generarQR(){
    if (this.value == '') {
      this.value = v4()
      return this.value;
    }
    
  

  }

  async cargarDatos(){
    this.asistencias = await this.asistenciaStorage.getDatos(this.KEY_ASISTENCIA);
  }



  async registrar(){
    var resp = await this.asistenciaStorage.agregar(this.KEY_ASISTENCIA, this.asistencia);
    if(resp){
      alert('Clase iniciada');
      await this.cargarDatos();
      
    }
  }




}
