import { Component, input, output } from '@angular/core';
import { TwoFirstNamesPipe } from '../../app/core/pipes/two-first-names.pipe';
import { AngularMaterialModule } from '../../app/shared/angular-material/angular-material.module';

export type MenuItens = { label: string, active: boolean, action: string }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AngularMaterialModule,
    TwoFirstNamesPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public onLogoClick = output()
  public menuItemClick = output<string>();
  public sideMenu = output<boolean>();
  public username = input<string | null>(null);
  public navItens = input<MenuItens[]>([])
}

