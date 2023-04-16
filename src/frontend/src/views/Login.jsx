import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useState } from "react";

function Login() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">ASCETICISM</div>
        </div>

        <div>
          <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
          <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

          <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
          <InputText type="password" placeholder="Password" className="w-full mb-3" />

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox id="rememberme" className="mr-2" checked={checked} onChange={e => setChecked(e.checked)} />
              <label htmlFor="rememberme">Запомнить</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Забыли пароль?</a>
          </div>

          <Button label="Войти" icon="pi pi-user" className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default Login;

