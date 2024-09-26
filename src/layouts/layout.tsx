import React from 'react';
import Header from '../components/Header.tsx'
type Props = {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="container mx-auto flex-1 py-10">{children}</div>
            </div>
            <div className="container">
                <div className="flex flex-col">
                    <p>1</p>
                    <p>2</p>
                </div>
            </div>
        </>
    )
}

export default Layout;