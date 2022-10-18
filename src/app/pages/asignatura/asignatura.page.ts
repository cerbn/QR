import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {


/*   asignatura = new FormGroup({
    idAsignatura: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    sigla: new FormControl('', [Validators.required, Validators.minLength(3)]),
    profesor: new FormControl('', [Validators.required]),
  });
  asignaturas: any[] = [];
  
  constructor(private AsignaturasService: AsignaturasService, private alertController: AlertController, private validaciones: ValidacionesService) { }
  
  
  ngOnInit() {
    this.asignaturas = this.AsignaturasService.gettAsignaturas();
  }

  //métodos:
  registrar() {
    if (this.AsignaturasService.addAsignatura(this.asignatura.value)) {
      alert('Asignatura registrado!');
      this.asignatura.reset();
    } else {
      alert('Usuario ya existe!');
    }
  }

  buscar(asignatura) {
    var siglaEncontrado = this.AsignaturasService.getAsignatura(asignatura);
    this.asignatura.setValue(siglaEncontrado);

  }

  async eliminar(asignatura) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar al usuario de rut ' + asignatura + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('NO ELIMINA!');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.AsignaturasService.deletetAsignatura(asignatura);
          },
        },
      ],
    });

    await alert.present();
  }

  modificar() {
    this.AsignaturasService.updatetAsignatura(this.asignatura.value);
    alert('Usuario modificado!');
    this.asignatura.reset();
  }} */

  //VARIABLES PARA TRABAJAR MI STORAGE:
  asignaturas: any[] = [];
  KEY_ASIGNATURAS = 'asignaturas';
  asignatura = {
    id: '',
    sigla: '',
    nombre: '',
    profesor: '',

  };

  //EJEMPLO:
  tipo: string = '';

  constructor(private asignaturaStorage: AsignaturasService, private loading: LoadingController) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  //MÉTODOS NECESARIOS PARA TRABAJAR EL STORAGE:
  async cargarDatos(){
    this.asignaturas = await this.asignaturaStorage.getDatos(this.KEY_ASIGNATURAS);
  }

  async registrar(){
    this.asignatura.id = '';
    var resp = await this.asignaturaStorage.agregar(this.KEY_ASIGNATURAS, this.asignatura);
    if(resp){
      alert('REGISTRADO');
      await this.cargarDatos();
    }
  }

  async eliminar(identificador){
    await this.asignaturaStorage.eliminar(this.KEY_ASIGNATURAS, identificador);
    await this.cargandoPantalla('eliminando...');
    await this.cargarDatos();
  }

  async cargar(identificador){
    this.asignatura = await this.asignaturaStorage.getDato(this.KEY_ASIGNATURAS, identificador);
  }

  async modificar(){
    await this.asignaturaStorage.actualizar(this.KEY_ASIGNATURAS, this.asignatura);
    await this.cargarDatos();
  }

  //LOADING:
  async cargandoPantalla(message){
    const cargando = await this.loading.create({
      message,
      duration: 3000,
      spinner: 'lines-small'
    });

    cargando.present();
  }


}


