import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { LoginUser } from "../../types/database/User";
import Swal from "sweetalert2";
import { translate } from "../../translate";
import { useRouter } from "next/router";

export type FormLoginUser = {
  email: string;
  password: string;
  csrfToken: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormLoginUser>();

  const router = useRouter();

  // .then(async (res) => {
  //     if (res?.error) {
  //       return Swal.fire({
  //         title: translate()["ops!"],
  //         text: translate()["Password or email incorrects"],
  //         icon: "warning",
  //       }).then(() => router.reload());
  //     }
  //     return router.push("/dashboard");
  //   });

  const onSubmit = async (data: LoginUser) => {
    const res = (await signIn("login", {
      ...data,
      redirect: false,
    })) as
      | {
          error: string | undefined;
          status: number;
          ok: boolean;
          url: string | null;
        }
      | undefined;
    if (res?.error) {
      return Swal.fire({
        title: translate()["ops!"],
        text: translate()["Password or email incorrects"],
        icon: "warning",
      }).then(() => router.reload());
    }
    return router.push("/dashboard");
  };

  useEffect(() => {
    setValue("email", "");
  });

  return (
    <div className="min-h-100vh d-flex align-items-center justify-content-center flex-wrap">
      <h1 className="d-block w-100 text-center text-white align-self-end">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </h1>
      <Card className="align-self-start">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                defaultValue=""
                required
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="text-dark">Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                required
                {...register("password")}
              />
            </Form.Group>
            <div className="buttons d-flex justify-content-around w-100 align-self-start">
              <Button type="submit" className="w-30">
                Enviar
              </Button>

              <Link href="/">
                <a className="btn btn-danger w-30">Voltar</a>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
