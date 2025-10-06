'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, DocumentTextIcon, ClipboardDocumentListIcon, FolderIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { searchItems, getSuggestionsByCategory, getRecentItems, type SearchItem } from '../../data/searchData'

export default function WelcomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [recentItems, setRecentItems] = useState<SearchItem[]>([])

  // Animation states
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    // Charger les éléments récents
    setRecentItems(getRecentItems(6))

    // Animations en cascade
    const timer1 = setTimeout(() => setTitleVisible(true), 200)
    const timer2 = setTimeout(() => setSubtitleVisible(true), 800)
    const timer3 = setTimeout(() => setSearchVisible(true), 1400)
    const timer4 = setTimeout(() => setCardsVisible(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    setShowSuggestions(false)

    // Simulation d'un délai de recherche pour l'effet visuel
    setTimeout(() => {
      const results = searchItems(query, 15) // Augmenté à 15 résultats
      setSearchResults(results)
      setIsSearching(false)
    }, 300)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSuggestions(true)
  }

  const navigateToResult = (item: SearchItem) => {
    // Navigation vers le dashboard avec paramètres appropriés
    if (item.category === 'milestone') {
      router.push('/dashboard?tab=milestones&highlight=' + item.id)
    } else if (item.category === 'dcr') {
      router.push('/dashboard?tab=dcr&highlight=' + item.id)
    } else if (item.category === 'document') {
      router.push('/dashboard?tab=documents&highlight=' + item.id)
    } else if (item.category === 'procedure') {
      router.push('/dashboard?tab=procedures&highlight=' + item.id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600 bg-green-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'milestone': return ClipboardDocumentListIcon
      case 'dcr': return DocumentTextIcon
      case 'document': return FolderIcon
      case 'procedure': return Cog6ToothIcon
      default: return DocumentTextIcon
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'milestone': return 'Milestone'
      case 'dcr': return 'DCR'
      case 'document': return 'Document'
      case 'procedure': return 'Procédure'
      default: return category
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* En-tête animé */}
        <div className="text-center mb-12">
          <h1 className={`text-6xl font-bold mb-4 transition-all duration-1000 ${
            titleVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Ocean Factory
            </span>
          </h1>
          
          <p className={`text-xl text-gray-600 mb-8 transition-all duration-1000 delay-300 ${
            subtitleVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            Système de gestion de facturation pour projets navals
          </p>
        </div>

        {/* Barre de recherche */}
        <div className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-700 ${
          searchVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher milestones, DCR, documents, procédures..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Indicateur de recherche */}
          {isSearching && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Recherche en cours...
              </div>
            </div>
          )}
        </div>

        {/* Résultats de recherche */}
        {searchResults.length > 0 && (
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Résultats de recherche ({searchResults.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((item) => {
                const IconComponent = getCategoryIcon(item.category)
                return (
                  <div
                    key={item.id}
                    onClick={() => navigateToResult(item)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 p-6 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{item.date}</span>
                      {item.value && (
                        <span className="font-medium text-green-600">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Suggestions par catégorie ou éléments récents */}
        {showSuggestions && (
          <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-1000 ${
            cardsVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            
            {/* Éléments récents */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Activités récentes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentItems.map((item) => {
                  const IconComponent = getCategoryIcon(item.category)
                  return (
                    <div
                      key={item.id}
                      onClick={() => navigateToResult(item)}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 p-6 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <IconComponent className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{item.date}</span>
                        {item.value && (
                          <span className="font-medium text-green-600">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Accès rapide par catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Milestones */}
              <div 
                onClick={() => router.push('/dashboard?tab=milestones')}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
              >
                <ClipboardDocumentListIcon className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">Milestones</h3>
                <p className="text-blue-100 text-sm">Étapes importantes du projet naval</p>
              </div>

              {/* DCR */}
              <div 
                onClick={() => router.push('/dashboard?tab=dcr')}
                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
              >
                <DocumentTextIcon className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">DCR</h3>
                <p className="text-orange-100 text-sm">Demandes de changement et modifications</p>
              </div>

              {/* Documents */}
              <div 
                onClick={() => router.push('/dashboard?tab=documents')}
                className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
              >
                <FolderIcon className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">Documents</h3>
                <p className="text-green-100 text-sm">Plans, spécifications et rapports</p>
              </div>

              {/* Procédures */}
              <div 
                onClick={() => router.push('/dashboard?tab=procedures')}
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105"
              >
                <Cog6ToothIcon className="w-12 h-12 mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">Procédures</h3>
                <p className="text-purple-100 text-sm">Formulaires et processus de facturation</p>
              </div>

            </div>
          </div>
        )}

        {/* Message si aucun résultat */}
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              Essayez avec des termes différents ou parcourez les catégories ci-dessous
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Effacer la recherche
            </button>
          </div>
        )}

      </div>
    </div>
  )
}