import React, { useContext, useEffect } from 'react';
import AuthContext from '../contexts/auth/AuthContext';
import AppContext from '../contexts/app/AppContext';
import Link from 'next/link';
import Layout from '../components/Layout';
import FileAlert from '../components/FileAlert';
import Dropzone from '../components/Dropzone';

const Index = () => {
    const authContext = useContext(AuthContext);
    const { getAuthenticatedUser } = authContext;

    const appContext = useContext(AppContext);
    const { url, fileMessage } = appContext;

    useEffect(() => {
        const token = localStorage.getItem('token');
        token && getAuthenticatedUser();
    }, [])

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                {
                    url ?
                        <>
                            <p className="text-center text-2xl">
                                <span className="font-bold text-blue-500 text-3xl">El enlace es: </span>{`${process.env.frontendURL}/enlaces/${url}`}
                            </p>
                            <div className="text-center">
                                <a
                                    className="bg-gray-600 hover:bg-gray-500 w-64 p-2 text-white font-bold cursor-pointer mt-10 rounded-full"
                                    type="button"
                                    onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                                >Copiar Enlace</a>
                            </div>
                        </>
                        :
                        <>
                            {fileMessage && <FileAlert />}
                            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                                <Dropzone />
                                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                    <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                                    <p className="text-lg leading-loose">
                                        <span className="text-red-500 font-bold">Firefox Send Clone</span> te permite compartir archivos con cifrado de
                                        extremo a extremo, este archivo es eliminado después de ser descargado. Así que puedes mantener lo que compartes
                                        en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
                                    </p>
                                    <Link href="/create-account">
                                        <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                                    </Link>
                                </div>
                            </div>
                        </>
                }
            </div>
        </Layout>
    );
}

export default Index;