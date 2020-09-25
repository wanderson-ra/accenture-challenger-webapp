import React from "react";

import renderer from "react-test-renderer";

import { useAuth, AuthProvider } from "../../src/contexts/auth.context";

import { userTemplateFull } from "../__fixture__/domains/user-template";

const userTest = userTemplateFull.build();

export const ConsumerTest: React.FC = () => {
    const { user, setUser } = useAuth();
    return (
        <div>
            {user ? (
                <div>
                    <span id="email">{user.email}</span>
                    <span id={"created"}>{user.created.toDateString()}</span>
                    <span id={"firstName"}>{user.firstName}</span>
                    <span id={"id"}>{user.id}</span>
                    <span id={"lastName"}>{user.lastName}</span>
                    <span id={"role"}>{user.role}</span>
                    <span id={"status"}>{user.status}</span>
                    <span id={"token"}>{user.token}</span>
                </div>
            ) : null}
            <button title={"Test"} id={"button"} onClick={() => setUser(userTest)} />
        </div>
    );
};

describe("Tests of AuthProvider", () => {
    let consumerTest: renderer.ReactTestRenderer;

    it("Test with success", async () => {
        await renderer.act(async () => {
            consumerTest = renderer.create(
                <AuthProvider>
                    <ConsumerTest />
                </AuthProvider>
            );
        });

        const button = consumerTest.root.findByProps({ id: "button" });

        await renderer.act(async () => {
            button.props.onClick();
        });

        const email = consumerTest.root.findByProps({ id: "email" });
        const created = consumerTest.root.findByProps({ id: "created" });
        const firstName = consumerTest.root.findByProps({ id: "firstName" });
        const id = consumerTest.root.findByProps({ id: "id" });
        const lastName = consumerTest.root.findByProps({ id: "lastName" });
        const role = consumerTest.root.findByProps({ id: "role" });
        const status = consumerTest.root.findByProps({ id: "status" });
        const token = consumerTest.root.findByProps({ id: "token" });

        expect(email.props.children).toEqual(userTest.email);
        expect(created.props.children).toEqual(userTest.created.toDateString());
        expect(firstName.props.children).toEqual(userTest.firstName);
        expect(id.props.children).toEqual(userTest.id);
        expect(lastName.props.children).toEqual(userTest.lastName);
        expect(role.props.children).toEqual(userTest.role);
        expect(status.props.children).toEqual(userTest.status);
        expect(token.props.children).toEqual(userTest.token);
    });
});
