// Utilitaires pour la synchronisation des prix entre les différents composants
// Cette logique assure la cohérence des montants entre Milestones, DCR, Registres et Formulaires

/**
 * Identifie le projet (C-228, C-229, C-230, C-231) basé sur la description d'un milestone ou DCR
 */
export function identifyProjectFromDescription(description: string): string {
  const desc = description.toLowerCase()
  
  if (desc.includes('c228') || desc.includes('c-228') || desc.includes('nlt1')) {
    return 'c228'
  } else if (desc.includes('c229') || desc.includes('c-229') || desc.includes('nlt2')) {
    return 'c229'
  } else if (desc.includes('c230') || desc.includes('c-230') || desc.includes('nlt3')) {
    return 'c230'
  } else if (desc.includes('c231') || desc.includes('c-231') || desc.includes('nlt4')) {
    return 'c231'
  }
  
  // Par défaut, associer aux projets en fonction de l'étape
  return 'c228' // Valeur par défaut
}

/**
 * Extrait les milestones/DCR liés à chaque projet
 */
export function groupByProject<T extends { id: number, description: string }>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {
    c228: [],
    c229: [],
    c230: [],
    c231: []
  }
  
  items.forEach(item => {
    const projectId = identifyProjectFromDescription(item.description)
    if (grouped[projectId]) {
      grouped[projectId].push(item)
    }
  })
  
  return grouped
}

/**
 * Calcule le montant avant taxe par projet selon les règles spécifiées
 * @param milestone Données du milestone
 * @returns Montant avant taxe pour le projet
 */
export function calculateProjectBeforeTaxAmount(milestone: { prixFermeTotal: number, prixUnitaireFerme: number }): number {
  // Si prix total detail milestone = 0, alors prix avant taxe par projet = prix unitaire milestone details
  if (milestone.prixFermeTotal === 0) {
    return milestone.prixUnitaireFerme
  }
  
  // Sinon, montant par projet avant taxe = prix total details milestone divisé par 4
  return milestone.prixFermeTotal / 4
}

/**
 * Calcule le montant TTC à partir du montant HT et du taux de taxe
 */
export function calculateTTC(montantHT: number, taxRate: number): number {
  return montantHT * (1 + taxRate)
}

/**
 * Calcule le montant HT à partir du montant TTC et du taux de taxe
 */
export function calculateHT(montantTTC: number, taxRate: number): number {
  return montantTTC / (1 + taxRate)
}

/**
 * Formate un montant en devise canadienne
 */
export function formatCAD(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Taux de taxes par projet selon les spécifications
 */
export const TAX_RATES = {
  c228: 0.05, // 5% GST
  c229: 0.05, // 5% GST
  c230: 0.15, // 15% HST
  c231: 0.15, // 15% HST
  default: 0.15
} as const

/**
 * Synchronise automatiquement les montants entre tous les composants
 */
export class PriceSynchronizer {
  static syncPriceChange(
    itemId: number,
    newPrice: number,
    itemType: 'milestone' | 'dcr',
    projectId: string,
    callbacks: {
      updateRegisters?: (projectId: string, itemType: string, itemId: number, montantHT: number, montantTTC: number) => void
      updateForms?: (projectId: string, totalHT: number, totalTTC: number) => void
      onSync?: (syncInfo: SyncInfo) => void
    }
  ) {
    const taxRate = TAX_RATES[projectId as keyof typeof TAX_RATES] || TAX_RATES.default
    const montantTTC = calculateTTC(newPrice, taxRate)

    // Synchroniser avec les registres
    if (callbacks.updateRegisters) {
      callbacks.updateRegisters(projectId, itemType, itemId, newPrice, montantTTC)
    }

    // Synchroniser avec les formulaires
    if (callbacks.updateForms) {
      callbacks.updateForms(projectId, newPrice, montantTTC)
    }

    // Information de synchronisation
    const syncInfo: SyncInfo = {
      projectId,
      itemType,
      itemId,
      montantHT: newPrice,
      montantTTC,
      taxRate,
      timestamp: new Date().toISOString()
    }

    if (callbacks.onSync) {
      callbacks.onSync(syncInfo)
    }

    console.log(`🔄 Prix synchronisé: ${itemType} ${itemId} dans ${projectId.toUpperCase()}`, syncInfo)
  }
}

export interface SyncInfo {
  projectId: string
  itemType: 'milestone' | 'dcr'
  itemId: number
  montantHT: number
  montantTTC: number
  taxRate: number
  timestamp: string
}

/**
 * Mapping spécifique des milestones aux projets basé sur les données réelles
 */
export const MILESTONE_PROJECT_MAPPING: Record<number, string> = {
  // C-228 NLT1
  19: 'c228', // 7.1 Hull, deck, wheelhouse enclosed C228 NLT1
  34: 'c228', // 8.1b Prime mover to Propulsor C228 NLT1
  65: 'c228', // 11.1 C228 NLT1 Ready for Delivery
  69: 'c228', // 12.1 C228 NLT1 Delivered and Accepted by the Canada

  // C-229 NLT2
  20: 'c229', // 7.2 Hull, deck, wheelhouse enclosed C229 NLT2
  66: 'c229', // 11.2 C229 NLT2 Ready for Delivery
  70: 'c229', // 12.2 C229 NLT2 Delivered and Accepted by the Canada

  // C-230 NLT3
  21: 'c230', // 7.3 Hull, deck, wheelhouse enclosed C230 NLT3
  67: 'c230', // 11.3 C230 NLT3 Ready for Delivery
  71: 'c230', // 12.3 C230 NLT3 Delivered and Accepted by the Canada

  // C-231 NLT4
  22: 'c231', // 7.4 Hull, deck, wheelhouse enclosed C231 NLT4
  68: 'c231', // 11.4 C231 NLT4 Ready for Delivery
  72: 'c231', // 12.4 C231 NLT4 Delivered and Accepted by the Canada
}

/**
 * Obtient le projet ID d'un milestone basé sur son ID
 */
export function getMilestoneProjectId(milestoneId: number | string): string {
  const id = typeof milestoneId === 'string' ? parseInt(milestoneId) : milestoneId
  return MILESTONE_PROJECT_MAPPING[id] || identifyProjectFromDescription('')
}