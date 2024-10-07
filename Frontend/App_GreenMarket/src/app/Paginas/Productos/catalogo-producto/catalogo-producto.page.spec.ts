import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoProductoComponent } from './catalogo-producto.page';

describe('CatalogoProductoPage', () => {
  let component: CatalogoProductoComponent;
  let fixture: ComponentFixture<CatalogoProductoComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
