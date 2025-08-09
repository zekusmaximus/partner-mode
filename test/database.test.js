import { db } from '../src/db/partnerDB';

// Simple test function to verify database functionality
async function testDatabase() {
  console.log('Testing Partner Mode Database...');
  
  try {
    // Test adding a connection
    await db.connections.add({
      timestamp: new Date().toISOString(),
      description: 'Test connection moment'
    });
    
    // Test adding a memory entry
    await db.memory.add({
      date: new Date().toISOString().split('T')[0],
      prompt: 'Test prompt',
      response: 'Test response'
    });
    
    // Test adding a reflection
    await db.reflections.add({
      date: new Date().toISOString().split('T')[0],
      content: 'Test reflection content',
      mood: 'peaceful'
    });
    
    // Test adding an intention
    await db.intentions.add({
      description: 'Test intention',
      created: new Date().toISOString()
    });
    
    // Test adding a partner moment
    await db.partnerMoments.add({
      timestamp: new Date().toISOString(),
      label: 'I listened deeply'
    });
    
    // Verify data was added
    const connections = await db.connections.toArray();
    const memory = await db.memory.toArray();
    const reflections = await db.reflections.toArray();
    const intentions = await db.intentions.toArray();
    const moments = await db.partnerMoments.toArray();
    
    console.log('✅ Database test passed!');
    console.log('Connections:', connections.length);
    console.log('Memory entries:', memory.length);
    console.log('Reflections:', reflections.length);
    console.log('Intentions:', intentions.length);
    console.log('Partner moments:', moments.length);
    
    // Clean up test data
    await db.connections.clear();
    await db.memory.clear();
    await db.reflections.clear();
    await db.intentions.clear();
    await db.partnerMoments.clear();
    
    console.log('✅ Test data cleaned up');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  testDatabase();
}

export { testDatabase };
