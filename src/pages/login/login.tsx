import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/authService";
import { LoginFormState } from "@/interfaces/LoginFormState";

export function LoginForm() {
  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
    isValid: true,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!state.email || !state.password) {
      setState({ ...state, isValid: false });
      return;
    }

    if (!emailRegex.test(state.email)) {
      setState({ ...state, isValid: false });
      return;
    }

    if (state.isValid) {
      login(state.email, state.password)
        .then((data) => {
          localStorage.setItem('authToken', data.token);
          window.location.href = '/flights';
        })
        .catch((e) => {
          setState({ ...state, isValid: false });
        });
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <Card className="w-full max-w-sm md:max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Entrar</CardTitle>
            <CardDescription>
              Insira suas informações para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@acme.com"
                  state={state.isValid ? 'default' : 'error'}
                  onFocus={() => setState({ ...state, isValid: true })}
                  required
                  value={state.email}
                  onChange={(e) => setState({ ...state, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  state={state.isValid ? 'default' : 'error'}
                  onFocus={() => setState({ ...state, isValid: true })}
                  required
                  value={state.password}
                  onChange={(e) => setState({ ...state, password: e.target.value })}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Entrar
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
