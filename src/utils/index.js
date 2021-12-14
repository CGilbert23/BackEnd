const getCombineCounts = (data, dept_id) => {
   const result = data.reduce((res, ele) => {
       if(ele.dept_id === dept_id) res.push(Number(ele.days))
       return res;
   }, []);
   const lengthOfResult = result.length; 
   const average = result.reduce((a, b) => a + b, 0)/lengthOfResult;
   return Math.round(average) || 0;
};
  
module.exports = { getCombineCounts };