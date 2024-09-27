const travelArticle = {
  title: 'Exploring the World: The Joys of Travel',
  content: `
    Traveling is one of the most enriching experiences one can have. It allows individuals to break free from their daily routines and discover the beauty and diversity of our world. 
    From the bustling streets of Tokyo to the serene beaches of Bali, each destination has its own charm and unique story to tell.
    
    One of the primary benefits of travel is the opportunity to immerse oneself in different cultures. 
    Engaging with locals, tasting authentic cuisine, and participating in traditional ceremonies create lasting memories and deepen our understanding of humanity.
    
    Additionally, travel has been shown to improve mental health. 
    The excitement of visiting new places and the relaxation that comes from a change of scenery can greatly reduce stress and anxiety.
    
    Furthermore, travel encourages personal growth. 
    Navigating unfamiliar environments and overcoming language barriers can enhance problem-solving skills and boost confidence.
    
    In conclusion, travel is more than just visiting new places; it's about creating connections, understanding different cultures, and enriching our lives. 
    So pack your bags, and let the adventure begin!
  `,
  imageUrl: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const travelTopics = [
  {
    title: 'Importance of Tourism',
    description: 'Tourism plays a crucial role in the economy by creating jobs and supporting local businesses.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664910322622-55c698381c87?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Cultural Exchange',
    description: 'Travel fosters cultural exchange, allowing people to share their customs and traditions.',
    imageUrl: 'https://images.unsplash.com/photo-1692264086612-02c791cd6d13?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Understanding Civilizations',
    description: 'Exploring different countries helps in understanding their history, culture, and way of life.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1694475067252-eb9cd7688d2b?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Adventure and Discovery',
    description: 'Traveling is about adventure, whether it’s hiking in the mountains or exploring ancient ruins.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661918785181-378c2e53cb42?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Sustainable Travel',
    description: 'How to reduce your carbon footprint while exploring new destinations.',
    imageUrl: 'https://images.unsplash.com/photo-1474183725112-79b6800d89a0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Solo Travel',
    description: 'Why traveling alone can be the most rewarding experience of your life.',
    imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Budget Travel Tips',
    description: 'Explore the world without breaking the bank. Smart travel hacks for budget explorers.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Luxury Escapes',
    description: 'Indulge in the most luxurious travel experiences, from 5-star resorts to private islands.',
    imageUrl: 'https://th.bing.com/th/id/OIP.Epn68cwTEPMu1xKRbByl6gHaEK?rs=1&pid=ImgDetMain',
  }
];

export default function TravelSection() {
  return (
    <div className="max-w-4xl mx-auto p-10 rounded-lg mt-10">
      <hr className="my-14 border border-gray-300 bg-opacity-0" />

      <h1 className="text-3xl font-bold mb-4 text-center animate-fadeIn">{travelArticle.title}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <img 
          src={travelArticle.imageUrl} 
          alt={travelArticle.title} 
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4 transition-transform transform hover:scale-105"
        />
        <div className="md:w-1/2 p-4">
          <p className="text-gray-700 leading-relaxed animate-fadeIn">{travelArticle.content}</p>
        </div>
      </div>

      <hr className="my-8 border border-gray-300 bg-opacity-50" />

      <h2 className="text-3xl font-bold mt-10 mb-4 text-center text-gray-700 transform transition-transform duration-300 hover:translate-x-4 hover:-translate-y-1">
        Why Travel Matters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {travelTopics.map((topic, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <img 
              src={topic.imageUrl} 
              alt={topic.title} 
              className="w-full h-40 object-cover transition-opacity duration-300 group-hover:opacity-75" 
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold transform transition-transform duration-300 hover:translate-x-4">
                {topic.title}
              </h3>
              <p className="text-gray-700">{topic.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
