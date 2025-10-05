'use client'

import { DocumentCheckIcon, FolderArrowDownIcon } from '@heroicons/react/24/outline'

export default function CompilationManager() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DocumentCheckIcon className="w-8 h-8 text-purple-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Module de Compilation
          </h3>
          
          <p className="text-gray-600 mb-6">
            Ce module permet de compiler tous les documents du montage en un package final 
            prêt à être transmis au client.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Fonctionnalités à venir :</h4>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• Assemblage automatique des documents</li>
              <li>• Génération de PDF combiné</li>
              <li>• Validation de conformité</li>
              <li>• Export vers système client</li>
              <li>• Archivage automatique</li>
            </ul>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              disabled
              className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              <span>Compiler (Bientôt disponible)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}