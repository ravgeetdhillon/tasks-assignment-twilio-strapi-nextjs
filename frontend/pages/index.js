import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import { UsersAPI } from "../services/usersApi";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [jwtStrapiToken, setJwtStrapiToken] = useLocalStorage(
    "jwtStrapiToken",
    ""
  );

  useEffect(() => {
    if (jwtStrapiToken) {
      router.push("/tasks");
    }
  }, [jwtStrapiToken, router]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsLoading(true);
      UsersAPI.login({ email, password })
        .then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else {
            setJwtStrapiToken(result.jwt);
            router.push("/tasks");
          }
        })
        .catch((err) => console.error({ err }))
        .finally(() => setIsLoading(false));
    },
    [password, router, setJwtStrapiToken, email]
  );

  return (
    <>
      <div className="row mb-4">
        <div className="col-lg-6 mx-auto">
          <h1 className="mb-4">Tasks Portal</h1>
          <Form onSubmit={handleSubmit}>
            {error && <Alert>{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="mt-4"
              disabled={isLoading}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
