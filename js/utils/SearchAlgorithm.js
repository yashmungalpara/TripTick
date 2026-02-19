/**
 * Trie (Prefix Tree) Implementation for Efficient Search
 * Used to search destinations with O(L) time complexity where L is key length.
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.items = []; // Store associated items (trip objects)
    }
}

class SearchTrie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word and its associated data into the Trie.
     * @param {string} word - The keyword to index (e.g., trip title, location).
     * @param {any} item - The data to store (e.g., the trip object).
     */
    insert(word, item) {
        if (!word) return;
        let node = this.root;
        const normalizedWord = word.toLowerCase();

        for (let char of normalizedWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;

        // Avoid duplicates if re-indexing (optional, simple check)
        if (!node.items.some(existing => existing.id === item.id)) {
            node.items.push(item);
        }
    }

    /**
     * Searches for items matching the given prefix.
     * @param {string} prefix - The search string.
     * @returns {Array} - List of unique matching items.
     */
    search(prefix) {
        if (!prefix) return [];
        let node = this.root;
        const normalizedPrefix = prefix.toLowerCase();

        // Traverse to the node representing the prefix
        for (let char of normalizedPrefix) {
            if (!node.children[char]) {
                return []; // Prefix not found
            }
            node = node.children[char];
        }

        // Collect all items from the subtree
        return this._collectAllItems(node);
    }

    /**
     * Helper to recursively collect items from a node and its children.
     */
    _collectAllItems(node) {
        let results = [];

        // If this node marks the end of a word, add its items
        if (node.isEndOfWord) {
            results.push(...node.items);
        }

        // Recursively visit all children
        for (let char in node.children) {
            const childResults = this._collectAllItems(node.children[char]);
            results.push(...childResults);
        }

        // Deduplicate results (since multiple keywords might point to same trip)
        const uniqueResults = [];
        const seenIds = new Set();

        for (const item of results) {
            if (!seenIds.has(item.id)) {
                seenIds.add(item.id);
                uniqueResults.push(item);
            }
        }

        return uniqueResults;
    }

    /**
     * Clear the Trie
     */
    clear() {
        this.root = new TrieNode();
    }
}

// Export a singleton instance
const searchEngine = new SearchTrie();
export default searchEngine;
