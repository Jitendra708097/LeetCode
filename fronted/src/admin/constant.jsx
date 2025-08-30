

export const LANGUAGES = [
  { id: 'C', name: 'C' },
  { id: 'C++', name: 'C++' },
  { id: 'JavaScript', name: 'JavaScript' },
  { id: 'Java', name: 'Java' },
];

export const BLANK_PROBLEM = {
    name: '',
    tags: [],
    difficulty: 'Easy',
    visibleTestCases: '',
    hiddenTestCases: '',
    code: {
        ['C']: { initialCode: '', referenceCode: '' },
        ['C++']: { initialCode: '', referenceCode: '' },
        ['JavaScript']: { initialCode: '', referenceCode: '' },
        ['Java']: { initialCode: '', referenceCode: '' },
    }
};


export const MOCK_PROBLEMS = [
  {
    id: '1',
    name: 'Two Sum',
    tags: ['array', 'hash-table'],
    difficulty: 'Easy',
    visibleTestCases: 'nums = [2, 7, 11, 15], target = 9\nnums = [3, 2, 4], target = 6',
    hiddenTestCases: 'nums = [-1, -2, -3, -4, -5], target = -8',
    code: {
      ['C']: {
        initialCode: 'int* twoSum(int* nums, int numsSize, int target, int* returnSize){}',
        referenceCode: '/* Reference solution in C */',
      },
      ['C++']: {
        initialCode: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
        referenceCode: '/* Reference solution in C++ */',
      },
      ['JavaScript']: {
        initialCode: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};',
        referenceCode: '/* Reference solution in JavaScript */',
      },
      ['Java']: {
        initialCode: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
        referenceCode: '/* Reference solution in Java */',
      },
    },
  },
  {
    id: '2',
    name: 'Add Two Numbers',
    tags: ['linked-list', 'math'],
    difficulty: 'Medium',
    visibleTestCases: 'l1 = [2,4,3], l2 = [5,6,4]\nl1 = [0], l2 = [0]',
    hiddenTestCases: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]',
     code: {
      ['C']: {
        initialCode: 'struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2){}',
        referenceCode: '/* Reference solution in C */',
      },
      ['CPP']: {
        initialCode: 'class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};',
        referenceCode: '/* Reference solution in C++ */',
      },
      ['JavaScript']: {
        initialCode: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\nvar addTwoNumbers = function(l1, l2) {\n    \n};',
        referenceCode: '/* Reference solution in JavaScript */',
      },
      ['Java']: {
        initialCode: 'class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}',
        referenceCode: '/* Reference solution in Java */',
      },
    },
  },
];
