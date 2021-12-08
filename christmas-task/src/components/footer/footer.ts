import './footer.scss';
import { BaseComponent } from '../base-componet';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['main-footer'], 'footer');
    this.element.innerHTML = `<div class="container">
    <ul class="copyright">
      <li class="copyright-item">
        <a href="https://github.com/Vadosdavos">@Vadosdavos</a>, 2021
      </li>
      <li class="copyright-item">
        <a href="https://rs.school/js/"
          ><img src="./rs_school_js.svg" width="55" alt="RSschool logo"
        /></a>
      </li>
    </ul>
  </div>`;
  }
}
