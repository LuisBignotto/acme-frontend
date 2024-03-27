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
import { Link } from "react-router-dom";

export function RegisterForm() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [isValid, setIsValid] = useState(false);

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email || !password) {
      setIsValid(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setIsValid(false);
      return;
    }

    if (password.length < 8) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
 };

 return (


<div className="h-screen flex items-center justify-center px-4">
    <Card className="w-full max-w-sm md:max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Cadastrar</CardTitle>
          <CardDescription>
            Insira suas informações para fazer o cadastro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Nome</Label>
              <Input
                id="first-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@acme.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link to="../login" className="underline text-blue-500">
              Entre aqui.
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  </div>
 );
}
