import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Rodape() {
    return (
        <footer className="rodape">
            <div className="max-w-6xl mx-auto px-4 py-2">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold mb-2">Sistema de Notas FIAP</h2>
                        <p className="text-gray-400">Projeto desenvolvido para CP6 - FRONT-END</p>
                    </div>
                    
                    <div className="flex space-x-6">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                           className="text-gray-400 hover:text-white transition-colors">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                           className="text-gray-400 hover:text-white transition-colors">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-4 pt-4 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} FIAP. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
