// Base de données de recherche complète pour Ocean Factory

export interface SearchItem {
  id: string
  title: string
  description: string
  category: 'milestone' | 'dcr' | 'document' | 'procedure'
  status: 'complete' | 'in-progress' | 'pending' | 'approved' | 'rejected'
  keywords: string[]
  date?: string
  value?: string
  reference?: string
}

export const searchDatabase: SearchItem[] = [
  // MILESTONES - Étapes importantes du projet
  {
    id: 'mil-001',
    title: 'Milestone 1.1 - Conception initiale',
    description: 'Finalisation des plans et spécifications techniques de base pour le navire CSC',
    category: 'milestone',
    status: 'complete',
    keywords: ['conception', 'plans', 'spécifications', 'technique', 'base', 'CSC', 'design'],
    date: '2024-01-15',
    value: '$2,450,000',
    reference: 'CSC-M1.1'
  },
  {
    id: 'mil-002',
    title: 'Milestone 2.3 - Assemblage coque section avant',
    description: 'Assemblage complet de la section avant de la coque avec systèmes intégrés',
    category: 'milestone',
    status: 'complete',
    keywords: ['assemblage', 'coque', 'section', 'avant', 'systèmes', 'intégrés', 'fabrication'],
    date: '2024-03-22',
    value: '$8,750,000',
    reference: 'CSC-M2.3'
  },
  {
    id: 'mil-003',
    title: 'Milestone 4.2 - Installation systèmes propulsion',
    description: 'Installation et tests des moteurs diesels MTU et systèmes de propulsion',
    category: 'milestone',
    status: 'complete',
    keywords: ['installation', 'systèmes', 'propulsion', 'moteurs', 'diesels', 'MTU', 'tests'],
    date: '2024-05-18',
    value: '$15,230,000',
    reference: 'CSC-M4.2'
  },
  {
    id: 'mil-004',
    title: 'Milestone 7.3c - Assemblage timonerie et coque',
    description: 'Assemblage complet de la timonerie et acceptation finale de la coque par le Canada',
    category: 'milestone',
    status: 'complete',
    keywords: ['assemblage', 'timonerie', 'coque', 'acceptation', 'finale', 'Canada', 'inspection'],
    date: '2024-09-30',
    value: '$16,367,155.59',
    reference: 'CSC-M7.3c'
  },
  {
    id: 'mil-005',
    title: 'Milestone 8.1 - Tests systèmes navigation',
    description: 'Tests complets des systèmes de navigation et communication électroniques',
    category: 'milestone',
    status: 'in-progress',
    keywords: ['tests', 'systèmes', 'navigation', 'communication', 'électroniques', 'radar', 'GPS'],
    date: '2024-11-15',
    value: '$4,890,000',
    reference: 'CSC-M8.1'
  },
  {
    id: 'mil-006',
    title: 'Milestone 9.4 - Essais en mer phase 1',
    description: 'Premiers essais en mer avec évaluation des performances de base',
    category: 'milestone',
    status: 'pending',
    keywords: ['essais', 'mer', 'phase', 'évaluation', 'performances', 'base', 'navigation'],
    date: '2025-01-20',
    value: '$3,220,000',
    reference: 'CSC-M9.4'
  },

  // DCR - Demandes de changement
  {
    id: 'dcr-001',
    title: 'DCR-2024-001 - Modification systèmes radar',
    description: 'Remplacement du radar Furuno par système Raytheon AN/SPS-77 plus performant',
    category: 'dcr',
    status: 'approved',
    keywords: ['modification', 'radar', 'Furuno', 'Raytheon', 'AN/SPS-77', 'performant', 'navigation'],
    date: '2024-02-14',
    value: '+$850,000',
    reference: 'DCR-2024-001'
  },
  {
    id: 'dcr-002',
    title: 'DCR-2024-007 - Renforcement coque avant',
    description: 'Ajout de renforts structuraux dans la section avant pour navigation arctique',
    category: 'dcr',
    status: 'approved',
    keywords: ['renforcement', 'coque', 'avant', 'renforts', 'structuraux', 'navigation', 'arctique'],
    date: '2024-04-03',
    value: '+$1,200,000',
    reference: 'DCR-2024-007'
  },
  {
    id: 'dcr-003',
    title: 'DCR-2024-012 - Upgrade systèmes communication',
    description: 'Mise à niveau des systèmes de communication pour compatibilité OTAN',
    category: 'dcr',
    status: 'in-progress',
    keywords: ['upgrade', 'systèmes', 'communication', 'compatibilité', 'OTAN', 'radio', 'satellite'],
    date: '2024-06-21',
    value: '+$675,000',
    reference: 'DCR-2024-012'
  },
  {
    id: 'dcr-004',
    title: 'DCR-2024-018 - Optimisation consommation carburant',
    description: 'Modifications moteurs pour réduction consommation de 8% selon nouvelles normes',
    category: 'dcr',
    status: 'pending',
    keywords: ['optimisation', 'consommation', 'carburant', 'modifications', 'moteurs', 'réduction', 'normes'],
    date: '2024-08-15',
    value: '-$320,000',
    reference: 'DCR-2024-018'
  },
  {
    id: 'dcr-005',
    title: 'DCR-2024-023 - Système défense CIWS',
    description: 'Installation système de défense rapprochée Phalanx CIWS Block 1B',
    category: 'dcr',
    status: 'rejected',
    keywords: ['système', 'défense', 'CIWS', 'Phalanx', 'Block', '1B', 'armement', 'protection'],
    date: '2024-09-12',
    value: '+$4,500,000',
    reference: 'DCR-2024-023'
  },

  // DOCUMENTS - Documentation technique et contractuelle
  {
    id: 'doc-001',
    title: 'Plans généraux navire CSC - Version 3.2',
    description: 'Plans architecturaux complets du navire de combat de surface canadien',
    category: 'document',
    status: 'approved',
    keywords: ['plans', 'généraux', 'navire', 'CSC', 'architecturaux', 'combat', 'surface', 'canadien'],
    date: '2024-01-10',
    reference: 'DOC-CSC-001-V3.2'
  },
  {
    id: 'doc-002',
    title: 'Spécifications techniques moteurs MTU',
    description: 'Documentation technique complète des moteurs diesels MTU 20V 4000 M93L',
    category: 'document',
    status: 'approved',
    keywords: ['spécifications', 'techniques', 'moteurs', 'MTU', '20V', '4000', 'M93L', 'diesels'],
    date: '2024-02-05',
    reference: 'DOC-MTU-002'
  },
  {
    id: 'doc-003',
    title: 'Certificat qualité acier marine',
    description: 'Certification qualité pour l\'acier haute résistance utilisé dans la construction',
    category: 'document',
    status: 'approved',
    keywords: ['certificat', 'qualité', 'acier', 'marine', 'haute', 'résistance', 'construction', 'certification'],
    date: '2024-03-18',
    reference: 'DOC-STEEL-003'
  },
  {
    id: 'doc-004',
    title: 'Manuel maintenance systèmes navigation',
    description: 'Manuel complet de maintenance préventive et corrective des systèmes de navigation',
    category: 'document',
    status: 'in-progress',
    keywords: ['manuel', 'maintenance', 'systèmes', 'navigation', 'préventive', 'corrective', 'procédures'],
    date: '2024-07-22',
    reference: 'DOC-NAV-004'
  },
  {
    id: 'doc-005',
    title: 'Rapport inspection Transport Canada',
    description: 'Rapport officiel d\'inspection de Transport Canada pour certification navire',
    category: 'document',
    status: 'pending',
    keywords: ['rapport', 'inspection', 'Transport', 'Canada', 'certification', 'navire', 'officiel'],
    date: '2024-10-01',
    reference: 'DOC-TC-005'
  },
  {
    id: 'doc-006',
    title: 'Contrat principal Industries Ocean',
    description: 'Contrat principal signé entre Industries Ocean et le gouvernement du Canada',
    category: 'document',
    status: 'approved',
    keywords: ['contrat', 'principal', 'Industries', 'Ocean', 'gouvernement', 'Canada', 'signé'],
    date: '2023-11-15',
    reference: 'DOC-CONTRACT-001',
    value: '$131,906,612.35'
  },

  // PROCEDURES - Procédures et formulaires
  {
    id: 'proc-001',
    title: 'PWGSC-1111 Réclamation progressive #137',
    description: 'Formulaire de réclamation de paiement progressif pour milestone 7.3c',
    category: 'procedure',
    status: 'in-progress',
    keywords: ['PWGSC-1111', 'réclamation', 'progressive', 'paiement', 'milestone', '7.3c', 'formulaire'],
    date: '2024-10-05',
    value: '$17,881,117.48',
    reference: 'PWGSC-1111-137'
  },
  {
    id: 'proc-002',
    title: 'Procédure inspection qualité soudures',
    description: 'Procédure détaillée pour l\'inspection et certification des soudures critiques',
    category: 'procedure',
    status: 'approved',
    keywords: ['procédure', 'inspection', 'qualité', 'soudures', 'certification', 'critiques', 'contrôle'],
    date: '2024-01-20',
    reference: 'PROC-WELD-002'
  },
  {
    id: 'proc-003',
    title: 'Protocole tests systèmes propulsion',
    description: 'Protocole complet de tests et validation des systèmes de propulsion marine',
    category: 'procedure',
    status: 'approved',
    keywords: ['protocole', 'tests', 'systèmes', 'propulsion', 'validation', 'marine', 'essais'],
    date: '2024-05-10',
    reference: 'PROC-PROP-003'
  },
  {
    id: 'proc-004',
    title: 'Formulaire changement configuration',
    description: 'Formulaire standardisé pour demandes de modification de configuration technique',
    category: 'procedure',
    status: 'approved',
    keywords: ['formulaire', 'changement', 'configuration', 'demandes', 'modification', 'technique', 'standardisé'],
    date: '2024-03-01',
    reference: 'PROC-CONFIG-004'
  },
  {
    id: 'proc-005',
    title: 'Checklist livraison finale navire',
    description: 'Liste de vérification complète avant livraison finale du navire au client',
    category: 'procedure',
    status: 'pending',
    keywords: ['checklist', 'livraison', 'finale', 'navire', 'vérification', 'client', 'acceptation'],
    date: '2025-03-15',
    reference: 'PROC-DELIVERY-005'
  },
  {
    id: 'proc-006',
    title: 'Rapport avancement travaux mensuel',
    description: 'Modèle de rapport mensuel d\'avancement des travaux de construction navale',
    category: 'procedure',
    status: 'approved',
    keywords: ['rapport', 'avancement', 'travaux', 'mensuel', 'construction', 'navale', 'modèle'],
    date: '2024-01-01',
    reference: 'PROC-MONTHLY-006'
  },

  // Données supplémentaires pour enrichir les résultats
  {
    id: 'mil-007',
    title: 'Milestone 5.6 - Installation électronique navale',
    description: 'Installation complète des systèmes électroniques et informatiques navals',
    category: 'milestone',
    status: 'complete',
    keywords: ['installation', 'électronique', 'navale', 'systèmes', 'informatiques', 'navals', 'équipement'],
    date: '2024-07-10',
    value: '$6,780,000',
    reference: 'CSC-M5.6'
  },
  {
    id: 'dcr-006',
    title: 'DCR-2024-030 - Blindage compartiment munitions',
    description: 'Renforcement du blindage du compartiment de stockage des munitions',
    category: 'dcr',
    status: 'approved',
    keywords: ['blindage', 'compartiment', 'munitions', 'renforcement', 'stockage', 'protection', 'sécurité'],
    date: '2024-10-12',
    value: '+$2,100,000',
    reference: 'DCR-2024-030'
  },
  {
    id: 'doc-007',
    title: 'Manuel opérations systèmes combat',
    description: 'Manuel d\'utilisation des systèmes de combat et d\'armement du navire',
    category: 'document',
    status: 'in-progress',
    keywords: ['manuel', 'opérations', 'systèmes', 'combat', 'armement', 'navire', 'utilisation'],
    date: '2024-09-05',
    reference: 'DOC-COMBAT-007'
  },
  {
    id: 'proc-007',
    title: 'Procédure urgence construction',
    description: 'Procédures d\'urgence et évacuation pendant la phase de construction',
    category: 'procedure',
    status: 'approved',
    keywords: ['procédure', 'urgence', 'construction', 'évacuation', 'sécurité', 'chantier', 'maritime'],
    date: '2024-01-15',
    reference: 'PROC-EMERGENCY-007'
  }
]

// Fonction de recherche améliorée
export function searchItems(query: string, limit: number = 10): SearchItem[] {
  if (!query.trim()) {
    return searchDatabase.slice(0, limit)
  }

  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0)

  // Fonction de scoring pour pertinence
  const calculateScore = (item: SearchItem): number => {
    let score = 0

    // Score basé sur le titre (poids élevé)
    if (item.title.toLowerCase().includes(queryLower)) {
      score += 50
    }
    queryWords.forEach(word => {
      if (item.title.toLowerCase().includes(word)) {
        score += 20
      }
    })

    // Score basé sur la description
    if (item.description.toLowerCase().includes(queryLower)) {
      score += 30
    }
    queryWords.forEach(word => {
      if (item.description.toLowerCase().includes(word)) {
        score += 10
      }
    })

    // Score basé sur les mots-clés (très important)
    item.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(queryLower)) {
        score += 40
      }
      queryWords.forEach(word => {
        if (keyword.toLowerCase().includes(word)) {
          score += 15
        }
      })
    })

    // Score basé sur la référence
    if (item.reference?.toLowerCase().includes(queryLower)) {
      score += 25
    }

    // Bonus pour correspondance exacte
    if (item.title.toLowerCase() === queryLower) {
      score += 100
    }

    return score
  }

  // Filtrer et trier par pertinence
  const results = searchDatabase
    .map(item => ({ item, score: calculateScore(item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item)

  return results
}

// Fonction pour obtenir des suggestions basées sur la catégorie
export function getSuggestionsByCategory(category: string, limit: number = 5): SearchItem[] {
  return searchDatabase
    .filter(item => item.category === category)
    .slice(0, limit)
}

// Fonction pour obtenir les éléments récents
export function getRecentItems(limit: number = 10): SearchItem[] {
  return searchDatabase
    .filter(item => item.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, limit)
}