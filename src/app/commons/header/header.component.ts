import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import $ from "jquery";
import { jwtDecode } from 'jwt-decode'; // ✅ correcto
import { JwtHelperService } from '@auth0/angular-jwt';
import { SweetDialogs } from '../../core/utils/sweet-dialogs';
import { AuthService } from '../../modules/authentication/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  decode: any = {};
  today: Date = new Date();
  _today: Date = new Date(2024, 11, 1);
  
  showProfileDetail: boolean = false;
  showMenu = false;

  permissions: any = [];

  User: string = "UserName";
  ProfileImage: string = "";
  Position: string = '';

  imgURL: string = 'https://firebasestorage.googleapis.com/v0/b/secap-533fc.appspot.com/o/';

  menuItems = [
    {
      label: 'Inicio',
      command: () => {
        this.router.navigate(['/hola']);
      }
    },
    {
      label: 'Oficialía de Partes',
      // permission: ['AdminControl', 'CreateProposal', 'ReadAllProposal', 'ReadOwnProposal', 'ManageProposal', 'ReadAllDocument', 'ReadOwnDocument', 'FinishRevition'],
      children: [
        {
          label: 'Generador de ficha de control',
          // permission: ['AdminControl', 'ReadAllProposal', 'ReadOwnProposal', 'ManageProposal', 'FinishRevision'],
          command: () => {
            this.router.navigate(['documentApprovals']);
          }
        },
        {
          label: 'Documentos',
          // permission: ['AdminControl', 'CreateProposal', 'ReadAllDocument', 'ReadOwnDocument'],
          command: () => {
            this.router.navigate(['documentApprovals']);
          }
        }
      ]
    },
    {
      label: 'Administración',
      // permission: ['AdminControl'],
      children: [
        {
          label: 'Usuarios',
          // permission: ['AdminControl'],
          command: () => {
            this.router.navigate(['/security/users']);
          }
        },
                {
          label: 'Tipos de correspondencia',
          // permission: ['AdminControl'],
          command: () => {
            this.router.navigate(['/security/correspondenceType']);
          }
        },
        {
          label: 'Tipos de turnado',
          // permission: ['AdminControl'],
          command: () => {
            this.router.navigate(['/security/shiftTypes']);
          }
        },
        {
          label: 'Posiciones - Permisos',
          // permission: ['AdminControl'],
          command: () => {
            this.router.navigate(['/hola']);
          }
        },
      ]
    },
  ];

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!event.target.closest('.header__profile-data')) {
      this.showProfileDetail = false;
    } else {
      this.showProfileDetail = true;
    }
  }

  constructor(
    protected sharedService: SharedService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private gobDialog: SweetDialogs,
    private authService: AuthService
  ) {
    this.authService.getUserPermissions().subscribe({
      next: (response) => {
        this.permissions = response;
      },
      error: (error) => {
        this.gobDialog.alertDialog('Error', 'No se pudieron obtener los permisos del usuario', 'error');
      }
    });
   }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.style.left = this.showMenu ? '0' : '-100vw';
    }
  }

  menuAvailable(menu: any): boolean {
    if (!menu) {
      return true;
    }

    return menu.some((item: string) => this.permissions.some((permission: any) => permission.PermissionName === item));
  }

  ngOnInit(): void {
    // this.menuLinksConfiguration();

    if(typeof window !== 'undefined' && localStorage) {
      const token: any = localStorage.getItem('AuthToken');

      if(token) {
        let decodeToken: any = jwtDecode(token);
        console.log('decodeToken', decodeToken);
        this.User = decodeToken.employeeName;
        this.ProfileImage = decodeToken.userPhoto;
        this.Position = decodeToken.position.Posición;
        console.log(this.Position);

        if (this.jwtHelper.isTokenExpired(token)) {
          this.gobDialog.alertDialog('Sesión expirada', 'La sesión ha expirado, por favor inicie sesión nuevamente', 'warning');
          this.router.navigate(['/auth/login']);
          localStorage.removeItem('token');
        }
      }
    }
  }

  // menuLinksConfiguration(): void {
  //   $(".menu-link").click(function () {
  //     $(".menu-link").removeClass("is-active");
  //     $(this).addClass("is-active");
  //   });
  // }

  getPicture(): string {
    return this.imgURL + this.ProfileImage;
  }

  logOut(): void {
    this.gobDialog.confirmDialog('Cerrar Sesión', '¿Está seguro de cerrar sesión?', () => {
      localStorage.removeItem('token');
      localStorage.clear();
      this.router.navigate(['auth/login']);
    });
  }

  viewProfile(): void {

  }
}
