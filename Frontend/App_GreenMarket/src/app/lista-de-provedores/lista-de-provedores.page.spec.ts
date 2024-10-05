import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDeProvedoresPage } from './lista-de-provedores.page';

describe('ListaDeProvedoresPage', () => {
  let component: ListaDeProvedoresPage;
  let fixture: ComponentFixture<ListaDeProvedoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeProvedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
